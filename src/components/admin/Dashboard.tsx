"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LoaderCircle, Phone, Mail, Search } from "lucide-react";
import type { Record_ } from "@/lib/store";
import { rooms, bookingStatuses, type BookingStatus } from "@/lib/site";
import { clsx } from "@/lib/clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

const views = [
  { id: "room", label: "Room bookings" },
  { id: "table", label: "Table reservations" },
  { id: "inquiry", label: "Enquiries" },
] as const;

type View = (typeof views)[number]["id"];

export default function Dashboard({ records }: { records: Record_[] }) {
  const router = useRouter();
  const [view, setView] = useState<View>("room");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [busy, setBusy] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const counts = useMemo(
    () => ({
      room: records.filter((r) => r.kind === "room").length,
      table: records.filter((r) => r.kind === "table").length,
      inquiry: records.filter((r) => r.kind === "inquiry").length,
      pending: records.filter((r) => r.status === "pending").length,
    }),
    [records],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records
      .filter((r) => r.kind === view)
      .filter((r) => statusFilter === "all" || r.status === statusFilter)
      .filter(
        (r) =>
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.id.slice(0, 8).toLowerCase().includes(q),
      );
  }, [records, view, statusFilter, query]);

  async function setStatus(id: string, status: BookingStatus) {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Couldn't update that booking.");
        return;
      }
      // Server Component holds the list — refresh rather than mirror state.
      startTransition(() => router.refresh());
    } catch {
      alert("Couldn't reach the server.");
    } finally {
      setBusy(null);
    }
  }

  async function signOut() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="min-h-[100svh] px-6 pb-24 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-gold/70">The house panel</span>
            <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-light text-cream">
              Bookings
            </h1>
            <p className="mt-3 text-sm text-cream-dim">
              {counts.pending > 0 ? (
                <>
                  <span className="text-gold">{counts.pending}</span> waiting on you.
                </>
              ) : (
                "Nothing pending. All caught up."
              )}
            </p>
          </div>

          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-sm text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {/* Views */}
        <div className="mt-10 flex flex-wrap gap-1.5 border-b border-cream/10 pb-5">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={clsx(
                "relative rounded-full px-5 py-2.5 text-sm transition-colors",
                view === v.id ? "text-ink" : "text-cream-dim hover:text-cream",
              )}
            >
              {view === v.id && (
                <motion.span
                  layoutId="admin-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
              <span className="relative z-10">
                {v.label}
                <span className={clsx("ml-2", view === v.id ? "text-ink/60" : "text-cream-dim/50")}>
                  {counts[v.id]}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search
              size={14}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim/50"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, email, phone, or reference"
              className="w-full rounded-full border border-cream/15 bg-ink-soft py-2.5 pl-11 pr-4 text-sm text-cream placeholder:text-cream-dim/40 outline-none transition-colors focus:border-gold/50"
            />
          </div>

          <div className="flex gap-1.5">
            {(["all", ...bookingStatuses] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-xs capitalize transition-colors",
                  statusFilter === s
                    ? "border-gold/50 bg-gold/10 text-gold"
                    : "border-cream/10 text-cream-dim hover:text-cream",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {pending && (
            <LoaderCircle size={15} className="animate-spin text-cream-dim" />
          )}
        </div>

        {/* Rows */}
        <div className="mt-8 space-y-3">
          <AnimatePresence mode="popLayout">
            {rows.map((record) => (
              <motion.article
                key={record.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="rounded-xl border border-cream/10 bg-ink-soft p-5 md:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl text-cream">{record.name}</h3>
                      <StatusChip status={record.status} />
                      <span className="eyebrow text-cream-dim/40">
                        {record.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-dim">
                      <a
                        href={`tel:${record.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                      >
                        <Phone size={13} /> {record.phone}
                      </a>
                      <a
                        href={`mailto:${record.email}`}
                        className="inline-flex items-center gap-2 truncate transition-colors hover:text-gold"
                      >
                        <Mail size={13} /> {record.email}
                      </a>
                    </div>

                    <Details record={record} />
                  </div>

                  {/* Status actions */}
                  <div className="flex shrink-0 gap-2">
                    {bookingStatuses.map((s) => (
                      <button
                        key={s}
                        disabled={busy === record.id || record.status === s}
                        onClick={() => setStatus(record.id, s)}
                        className={clsx(
                          "rounded-full border px-4 py-2 text-xs capitalize transition-colors disabled:cursor-not-allowed",
                          record.status === s
                            ? "border-transparent bg-cream/5 text-cream-dim/40"
                            : s === "confirmed"
                              ? "border-moss/50 text-moss hover:bg-moss/10"
                              : s === "cancelled"
                                ? "border-red-500/40 text-red-400/90 hover:bg-red-500/10"
                                : "border-cream/15 text-cream-dim hover:text-cream",
                        )}
                      >
                        {busy === record.id ? "…" : s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {rows.length === 0 && (
            <div className="rounded-xl border border-dashed border-cream/10 py-20 text-center">
              <p className="font-display text-2xl text-cream-dim">Nothing here.</p>
              <p className="mt-2 text-sm text-cream-dim/50">
                {query || statusFilter !== "all"
                  ? "No records match that filter."
                  : "New bookings will appear here as they come in."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Details({ record }: { record: Record_ }) {
  const items: { k: string; v: string }[] = [];

  if (record.kind === "room") {
    items.push(
      { k: "Room", v: rooms.find((r) => r.slug === record.room)?.name ?? record.room },
      { k: "Check-in", v: fmt(record.checkIn) },
      { k: "Check-out", v: fmt(record.checkOut) },
      { k: "Guests", v: String(record.guests) },
    );
  } else if (record.kind === "table") {
    items.push(
      { k: "Date", v: fmt(record.date) },
      { k: "Time", v: record.time },
      { k: "Party", v: String(record.partySize) },
    );
  } else {
    items.push({ k: "Subject", v: record.subject });
  }

  const note = record.kind === "inquiry" ? record.message : record.notes;

  return (
    <>
      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-cream/[0.07] pt-4">
        {items.map((i) => (
          <div key={i.k}>
            <dt className="eyebrow text-cream-dim/40">{i.k}</dt>
            <dd className="mt-1 text-sm text-cream">{i.v}</dd>
          </div>
        ))}
      </dl>

      {note && (
        <p className="mt-4 border-l-2 border-gold/30 pl-4 text-sm leading-relaxed text-cream-dim">
          {note}
        </p>
      )}
    </>
  );
}

function StatusChip({ status }: { status: BookingStatus }) {
  return (
    <span
      className={clsx(
        "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]",
        status === "confirmed" && "border-moss/50 bg-moss/10 text-moss",
        status === "pending" && "border-gold/40 bg-gold/10 text-gold",
        status === "cancelled" && "border-red-500/30 bg-red-500/10 text-red-400/80",
      )}
    >
      {status}
    </span>
  );
}

function fmt(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
