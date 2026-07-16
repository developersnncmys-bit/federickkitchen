import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { BookingStatus } from "@/lib/site";

/**
 * File-backed JSON store. Deliberately dependency-free — the property takes a
 * handful of bookings a day, so a database would be scaffolding no one needs.
 * Swap `readAll`/`writeAll` for a DB client and nothing above this file changes.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "bookings.json");

export type RoomBooking = {
  id: string;
  kind: "room";
  status: BookingStatus;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes: string;
};

export type TableBooking = {
  id: string;
  kind: "table";
  status: BookingStatus;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  notes: string;
};

export type Inquiry = {
  id: string;
  kind: "inquiry";
  status: BookingStatus;
  createdAt: string;
  subject: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type Record_ = RoomBooking | TableBooking | Inquiry;

type Db = { records: Record_[] };

async function readAll(): Promise<Db> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Db;
  } catch {
    return { records: [] };
  }
}

async function writeAll(db: Db): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  // Write-then-rename so a crash mid-write can't truncate the file.
  const tmp = `${FILE}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

/**
 * Serialises read-modify-write cycles. Two guests booking the last room in the
 * same tick would otherwise both read an empty calendar and both win.
 */
let queue: Promise<unknown> = Promise.resolve();
function transact<T>(fn: (db: Db) => Promise<T> | T): Promise<T> {
  const run = queue.then(async () => {
    const db = await readAll();
    const result = await fn(db);
    await writeAll(db);
    return result;
  });
  // Keep the chain alive even if this link rejects.
  queue = run.catch(() => {});
  return run;
}

export async function listRecords(): Promise<Record_[]> {
  const db = await readAll();
  return [...db.records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createInquiry(
  input: Omit<Inquiry, "id" | "createdAt" | "status" | "kind">,
): Promise<Inquiry> {
  return transact((db) => {
    const full: Inquiry = {
      ...input,
      kind: "inquiry",
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    db.records.push(full);
    return full;
  });
}

/**
 * Books a room only if it is still free, deciding and writing inside one
 * transaction. Checking availability in the route and then creating would let
 * two guests pass the check before either wrote.
 */
export async function createRoomBooking(
  input: Omit<RoomBooking, "id" | "createdAt" | "status" | "kind">,
): Promise<RoomBooking | null> {
  return transact((db) => {
    const clash = db.records.some(
      (r) =>
        r.kind === "room" &&
        r.room === input.room &&
        r.status !== "cancelled" &&
        overlaps(input.checkIn, input.checkOut, r.checkIn, r.checkOut),
    );
    if (clash) return null;

    const full: RoomBooking = {
      ...input,
      kind: "room",
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    db.records.push(full);
    return full;
  });
}

/** Same atomicity concern as rooms: seats can sell out between check and write. */
export async function createTableBooking(
  input: Omit<TableBooking, "id" | "createdAt" | "status" | "kind">,
): Promise<{ booking: TableBooking } | { seatsLeft: number }> {
  return transact((db) => {
    const booked = db.records
      .filter(
        (r): r is TableBooking =>
          r.kind === "table" &&
          r.status !== "cancelled" &&
          r.date === input.date &&
          r.time === input.time,
      )
      .reduce((sum, r) => sum + r.partySize, 0);

    const left = Math.max(0, SEATS_PER_SLOT - booked);
    if (input.partySize > left) return { seatsLeft: left };

    const full: TableBooking = {
      ...input,
      kind: "table",
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    db.records.push(full);
    return { booking: full };
  });
}

export async function updateStatus(
  id: string,
  status: BookingStatus,
): Promise<Record_ | null> {
  return transact((db) => {
    const record = db.records.find((r) => r.id === id);
    if (!record) return null;
    record.status = status;
    return record;
  });
}

/* ------------------------------ Availability ------------------------------ */

/** Half-open overlap: a checkout on the 5th frees the room for a check-in on the 5th. */
function overlaps(aIn: string, aOut: string, bIn: string, bOut: string) {
  return aIn < bOut && bIn < aOut;
}

/**
 * Rooms are one-of-a-kind, so any live booking blocks the dates.
 * Cancelled bookings release their nights.
 */
export async function isRoomAvailable(
  room: string,
  checkIn: string,
  checkOut: string,
  ignoreId?: string,
): Promise<boolean> {
  const db = await readAll();
  return !db.records.some(
    (r) =>
      r.kind === "room" &&
      r.room === room &&
      r.id !== ignoreId &&
      r.status !== "cancelled" &&
      overlaps(checkIn, checkOut, r.checkIn, r.checkOut),
  );
}

export async function availabilityFor(
  checkIn: string,
  checkOut: string,
): Promise<Record<string, boolean>> {
  const db = await readAll();
  const taken = new Set(
    db.records
      .filter(
        (r): r is RoomBooking =>
          r.kind === "room" &&
          r.status !== "cancelled" &&
          overlaps(checkIn, checkOut, r.checkIn, r.checkOut),
      )
      .map((r) => r.room),
  );
  return Object.fromEntries(
    (await import("@/lib/site")).rooms.map((r) => [r.slug, !taken.has(r.slug)]),
  );
}

/** Twenty-four covers across the room; a slot is full when the seats are gone. */
const SEATS_PER_SLOT = 24;

export async function seatsLeft(date: string, time: string): Promise<number> {
  const db = await readAll();
  const booked = db.records
    .filter(
      (r): r is TableBooking =>
        r.kind === "table" &&
        r.status !== "cancelled" &&
        r.date === date &&
        r.time === time,
    )
    .reduce((sum, r) => sum + r.partySize, 0);
  return Math.max(0, SEATS_PER_SLOT - booked);
}
