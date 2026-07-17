"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import RoomBooking from "@/components/book/RoomBooking";
import TableBooking from "@/components/book/TableBooking";
import { clsx } from "@/lib/clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BookingEngine() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("type") === "table" ? "table" : "room";
  const [tab, setTab] = useState<"room" | "table">(initial);

  // Keep the tab in step with links like /book?type=table from the nav.
  useEffect(() => setTab(initial), [initial]);

  function select(next: "room" | "table") {
    setTab(next);
    const q = new URLSearchParams(params.toString());
    q.set("type", next);
    if (next === "table") q.delete("room");
    router.replace(`/book?${q.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-32">
      {/* Switch */}
      <div className="mx-auto flex w-full max-w-md gap-1 rounded-full border border-cream/10 bg-ink-soft p-1.5">
        {(["room", "table"] as const).map((t) => (
          <button
            key={t}
            onClick={() => select(t)}
            className={clsx(
              "relative flex-1 rounded-full px-6 py-3 text-sm transition-colors",
              tab === t ? "text-ink" : "text-cream-dim hover:text-cream",
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="book-tab"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
            <span className="relative z-10">
              {t === "room" ? "Book a Room" : "Book a Table"}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-12"
        >
          {tab === "room" ? <RoomBooking /> : <TableBooking />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
