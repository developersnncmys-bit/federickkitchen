"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, TriangleAlert, Clock } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import Confirmation from "@/components/book/Confirmation";
import { timeSlots } from "@/lib/site";
import { clsx } from "@/lib/clsx";

type Slot = { time: string; seatsLeft: number };

function istDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

function fmt(iso: string): string {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function TableBooking() {
  const [date, setDate] = useState(istDate(1));
  const [time, setTime] = useState<string>("");
  const [partySize, setPartySize] = useState(2);

  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");

  /* Seats left per sitting, refreshed whenever the date changes. */
  useEffect(() => {
    if (!date) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/availability?type=table&date=${date}`);
        const data = await res.json();
        if (!cancelled) setSlots(res.ok ? data.slots : null);
      } catch {
        if (!cancelled) setSlots(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [date]);

  // Drop a chosen sitting once the party outgrows the seats left in it.
  useEffect(() => {
    if (!time || !slots) return;
    const slot = slots.find((s) => s.time === time);
    if (slot && partySize > slot.seatsLeft) setTime("");
  }, [partySize, slots, time]);

  const lunch = timeSlots.filter((t) => Number(t.split(":")[0]) < 17);
  const dinner = timeSlots.filter((t) => Number(t.split(":")[0]) >= 17);

  function seatsFor(t: string): number {
    return slots?.find((s) => s.time === t)?.seatsLeft ?? 24;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!time) {
      setError("Pick a sitting first.");
      return;
    }
    setState("sending");
    setError("");
    setFields({});

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/bookings/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          notes: form.get("notes"),
          date,
          time,
          partySize,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFields(data.fields ?? {});
        setError(data.error ?? "Something went wrong.");
        setState("idle");
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
          { label: "Date", value: fmt(date) },
          { label: "Sitting", value: time },
          { label: "Party", value: `${partySize} ${partySize === 1 ? "guest" : "guests"}` },
        ]}
        onReset={() => {
          setState("idle");
          setTime("");
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="rounded-2xl border border-cream/10 bg-ink-soft p-7 md:p-9">
        <h2 className="font-display text-2xl text-cream">When, and how many?</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Date" htmlFor="date">
            <Input
              id="date"
              type="date"
              value={date}
              min={istDate()}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
            />
          </Field>
          <Field label="Party size" htmlFor="partySize" hint="More than 12? Ask about the long table.">
            <Select
              id="partySize"
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="bg-ink">
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-cream/10 bg-ink-soft p-7 md:p-9">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-cream">Pick a sitting</h2>
          {loading && (
            <span className="inline-flex items-center gap-2 text-xs text-cream-dim">
              <LoaderCircle size={13} className="animate-spin" /> Checking…
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-cream-dim">{fmt(date)}</p>

        <SlotGroup
          label="Lunch"
          times={lunch}
          time={time}
          setTime={setTime}
          seatsFor={seatsFor}
          partySize={partySize}
        />
        <SlotGroup
          label="Dinner"
          times={dinner}
          time={time}
          setTime={setTime}
          seatsFor={seatsFor}
          partySize={partySize}
        />
      </section>

      <section className="rounded-2xl border border-cream/10 bg-ink-soft p-7 md:p-9">
        <h2 className="font-display text-2xl text-cream">Your details</h2>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="t-name">
              <Input id="t-name" name="name" required autoComplete="name" />
              <FieldError msg={fields.name} />
            </Field>
            <Field label="Phone" htmlFor="t-phone">
              <Input id="t-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" />
              <FieldError msg={fields.phone} />
            </Field>
          </div>

          <Field label="Email" htmlFor="t-email">
            <Input id="t-email" name="email" type="email" required autoComplete="email" />
            <FieldError msg={fields.email} />
          </Field>

          <Field label="Special requests" htmlFor="t-notes">
            <Textarea
              id="t-notes"
              name="notes"
              rows={3}
              placeholder="Allergies, a birthday, a table by the window, anything at all."
            />
          </Field>

          {error && (
            <p className="flex items-start gap-2 text-sm text-red-400">
              <TriangleAlert size={15} className="mt-0.5 shrink-0" /> {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-6">
            <p className="text-xs text-cream-dim/60">
              {time ? (
                <>
                  <span className="text-cream">{partySize}</span> at{" "}
                  <span className="text-cream">{time}</span>, {fmt(date)}
                </>
              ) : (
                "Pick a sitting above to continue."
              )}
            </p>

            <button
              type="submit"
              disabled={state === "sending" || !time}
              className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {state === "sending" && <LoaderCircle size={15} className="animate-spin" />}
                {state === "sending" ? "Sending…" : "Reserve the table"}
              </span>
              <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>

          <p className="text-xs text-cream-dim/50">
            No payment online — we hold the table and confirm by email.
          </p>
        </form>
      </section>
    </div>
  );
}

function SlotGroup({
  label,
  times,
  time,
  setTime,
  seatsFor,
  partySize,
}: {
  label: string;
  times: readonly string[];
  time: string;
  setTime: (t: string) => void;
  seatsFor: (t: string) => number;
  partySize: number;
}) {
  return (
    <div className="mt-7">
      <span className="eyebrow flex items-center gap-2 text-cream-dim/50">
        <Clock size={12} /> {label}
      </span>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {times.map((t) => {
          const left = seatsFor(t);
          const full = left < partySize;
          const active = time === t;

          return (
            <button
              key={t}
              type="button"
              disabled={full}
              onClick={() => setTime(t)}
              title={full ? `Only ${left} seats left` : `${left} seats left`}
              className={clsx(
                "rounded-lg border px-5 py-3 text-sm transition-all duration-300",
                active
                  ? "border-gold bg-gold text-ink"
                  : "border-cream/15 text-cream hover:border-gold/50 hover:text-gold",
                full && "cursor-not-allowed border-cream/5 text-cream-dim/30 line-through hover:border-cream/5 hover:text-cream-dim/30",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="mt-2 block text-xs text-red-400">{msg}</span>;
}
