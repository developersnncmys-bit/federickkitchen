"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LoaderCircle, TriangleAlert, Check, Users } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import Confirmation from "@/components/book/Confirmation";
import Frame from "@/components/Frame";
import { rooms } from "@/lib/site";
import { clsx } from "@/lib/clsx";

type Availability = Record<string, boolean>;

/** Today and tomorrow in IST, as YYYY-MM-DD. */
function istDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

function nights(a: string, b: string): number {
  const ms = new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

function fmt(iso: string): string {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function RoomBooking() {
  const params = useSearchParams();

  const [checkIn, setCheckIn] = useState(istDate(1));
  const [checkOut, setCheckOut] = useState(istDate(3));
  const [room, setRoom] = useState<string>(params.get("room") ?? rooms[0].slug);
  const [guests, setGuests] = useState(2);

  const [avail, setAvail] = useState<Availability | null>(null);
  const [checking, setChecking] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");

  const selected = rooms.find((r) => r.slug === room)!;
  const nightCount = nights(checkIn, checkOut);
  const datesValid = Boolean(checkIn && checkOut) && nightCount > 0;

  /* Live availability whenever the dates change. */
  const check = useCallback(async () => {
    if (!datesValid) {
      setAvail(null);
      return;
    }
    setChecking(true);
    try {
      const res = await fetch(
        `/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`,
      );
      const data = await res.json();
      setAvail(res.ok ? data.rooms : null);
    } catch {
      setAvail(null);
    } finally {
      setChecking(false);
    }
  }, [checkIn, checkOut, datesValid]);

  useEffect(() => {
    const t = setTimeout(check, 250);
    return () => clearTimeout(t);
  }, [check]);

  // Don't let the guest count sit above what the chosen room sleeps.
  useEffect(() => {
    setGuests((g) => Math.min(g, selected.guests));
  }, [selected.guests]);

  const roomFree = avail?.[room] ?? true;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    setFields({});

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/bookings/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          notes: form.get("notes"),
          room,
          checkIn,
          checkOut,
          guests,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFields(data.fields ?? {});
        setError(data.error ?? "Something went wrong.");
        setState("idle");
        void check();
        return;
      }

      setReference(data.reference);
      setState("done");
    } catch {
      setError("We couldn't reach the house. Check your connection and try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <Confirmation
        reference={reference}
        lines={[
          { label: "Room", value: selected.name },
          { label: "Check-in", value: fmt(checkIn) },
          { label: "Check-out", value: fmt(checkOut) },
          { label: "Nights", value: String(nightCount) },
          { label: "Guests", value: String(guests) },
          {
            label: "Estimated total",
            value: `₹${(selected.price * nightCount).toLocaleString("en-IN")}`,
          },
        ]}
        onReset={() => setState("idle")}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
      <div className="space-y-8">
        {/* Dates */}
        <section
          id="availability"
          className="scroll-mt-28 rounded-2xl border border-cream/10 bg-ink-soft p-7 md:p-9"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-cream">Your dates</h2>
            {checking && (
              <span className="inline-flex items-center gap-2 text-xs text-cream-dim">
                <LoaderCircle size={13} className="animate-spin" />
                Checking…
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Check-in" htmlFor="checkIn">
              <Input
                id="checkIn"
                type="date"
                value={checkIn}
                min={istDate()}
                onChange={(e) => {
                  const v = e.target.value;
                  setCheckIn(v);
                  // Keep the stay valid rather than letting it invert.
                  if (v && checkOut <= v) {
                    const next = new Date(`${v}T00:00:00`);
                    next.setDate(next.getDate() + 1);
                    setCheckOut(next.toLocaleDateString("en-CA"));
                  }
                }}
              />
            </Field>
            <Field label="Check-out" htmlFor="checkOut">
              <Input
                id="checkOut"
                type="date"
                value={checkOut}
                min={checkIn || istDate(1)}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </Field>
          </div>

          {datesValid && (
            <p className="mt-4 text-sm text-cream-dim">
              {nightCount} {nightCount === 1 ? "night" : "nights"} · {fmt(checkIn)} &rarr;{" "}
              {fmt(checkOut)}
            </p>
          )}
        </section>

        {/* Room picker */}
        <section className="rounded-2xl border border-cream/10 bg-ink-soft p-7 md:p-9">
          <h2 className="font-display text-2xl text-cream">Choose a room</h2>

          <div className="mt-6 space-y-3">
            {rooms.map((r) => {
              const free = avail?.[r.slug] ?? true;
              const active = room === r.slug;

              return (
                <button
                  key={r.slug}
                  type="button"
                  disabled={!free}
                  onClick={() => setRoom(r.slug)}
                  className={clsx(
                    "flex w-full items-center gap-5 rounded-xl border p-4 text-left transition-all duration-300",
                    active
                      ? "border-gold/60 bg-gold/[0.06]"
                      : "border-cream/10 hover:border-cream/25",
                    !free && "cursor-not-allowed opacity-40",
                  )}
                >
                  <Frame
                    tone={r.tone}
                    src={r.image}
                    alt={r.name}
                    scrim={false}
                    className="h-16 w-20 shrink-0 rounded-lg"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2.5">
                      <span className="truncate font-display text-lg text-cream">
                        {r.name}
                      </span>
                      {active && <Check size={14} className="shrink-0 text-gold" />}
                    </span>
                    <span className="mt-1 flex items-center gap-3 text-xs text-cream-dim">
                      <span className="inline-flex items-center gap-1.5">
                        <Users size={11} /> {r.guests}
                      </span>
                      <span>·</span>
                      <span className="truncate">{r.bed}</span>
                    </span>
                  </span>

                  <span className="shrink-0 text-right">
                    <span className="block font-display text-xl text-gold">
                      ₹{r.price.toLocaleString("en-IN")}
                    </span>
                    <span className="eyebrow mt-0.5 block text-cream-dim/50">
                      {free ? "per night" : "taken"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {avail && !roomFree && (
            <p className="mt-5 flex items-center gap-2 text-sm text-amber-400/90">
              <TriangleAlert size={14} />
              That room is taken for those nights — pick another, or shift your dates.
            </p>
          )}
        </section>

        {/* Guest details */}
        <section className="rounded-2xl border border-cream/10 bg-ink-soft p-7 md:p-9">
          <h2 className="font-display text-2xl text-cream">Your details</h2>

          <form id="room-form" onSubmit={onSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="name">
                <Input id="name" name="name" required autoComplete="name" />
                <FieldError msg={fields.name} />
              </Field>
              <Field label="Phone" htmlFor="phone">
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" />
                <FieldError msg={fields.phone} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" htmlFor="email">
                <Input id="email" name="email" type="email" required autoComplete="email" />
                <FieldError msg={fields.email} />
              </Field>
              <Field label="Guests" htmlFor="guests" hint={`This room sleeps ${selected.guests}.`}>
                <Select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  {Array.from({ length: selected.guests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-ink">
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <Field label="Special requests" htmlFor="notes">
              <Textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Arriving late? Riding up? Anything the kitchen should know?"
              />
            </Field>

            {error && (
              <p className="flex items-start gap-2 text-sm text-red-400">
                <TriangleAlert size={15} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}
          </form>
        </section>
      </div>

      {/* Sticky summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <motion.div
          layout
          className="overflow-hidden rounded-2xl border border-cream/10 bg-ink-soft"
        >
          <Frame
            tone={selected.tone}
            src={selected.image}
            alt={selected.name}
            label={selected.name}
            className="h-40"
          />

          <div className="p-7">
            <h3 className="font-display text-2xl text-cream">{selected.name}</h3>
            <p className="mt-2 text-sm text-cream-dim">{selected.blurb}</p>

            <dl className="mt-7 space-y-3 border-t border-cream/10 pt-6 text-sm">
              <Line k="Check-in" v={fmt(checkIn)} />
              <Line k="Check-out" v={fmt(checkOut)} />
              <Line k="Guests" v={String(guests)} />
              <Line
                k="Rate"
                v={`₹${selected.price.toLocaleString("en-IN")} × ${nightCount} ${
                  nightCount === 1 ? "night" : "nights"
                }`}
              />
            </dl>

            <div className="mt-6 flex items-baseline justify-between border-t border-cream/10 pt-6">
              <span className="eyebrow text-cream-dim/60">Estimated total</span>
              <span className="font-display text-3xl text-gold">
                ₹{(selected.price * nightCount).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-2 text-xs text-cream-dim/50">
              Taxes as applicable. Nothing is charged now.
            </p>

            <button
              type="submit"
              form="room-form"
              disabled={state === "sending" || !datesValid || !roomFree}
              className="group relative mt-7 w-full overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {state === "sending" && <LoaderCircle size={15} className="animate-spin" />}
                {state === "sending" ? "Sending…" : "Request booking"}
              </span>
              <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-cream-dim/50">
              No payment online. We confirm by phone or email within 24 hours.
            </p>
          </div>
        </motion.div>
      </aside>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-cream-dim">{k}</dt>
      <dd className="text-right text-cream">{v}</dd>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="mt-2 block text-xs text-red-400">{msg}</span>;
}
