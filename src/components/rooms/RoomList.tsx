"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Maximize, BedDouble, Check } from "lucide-react";
import Frame from "@/components/Frame";
import { rooms } from "@/lib/site";
import { clsx } from "@/lib/clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function RoomList() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
      <div className="space-y-6">
        {rooms.map((room, i) => (
          <motion.article
            key={room.slug}
            id={room.slug}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="group grid overflow-hidden rounded-2xl border border-cream/10 bg-ink-soft transition-colors duration-500 hover:border-gold/25 lg:grid-cols-2"
          >
            <Frame
              tone={room.tone}
              src={room.image}
              alt={room.name}
              label={room.name}
              parallax
              className={clsx(
                "min-h-[280px] lg:min-h-[460px]",
                // Alternate the photo side so the page doesn't march
                i % 2 === 1 && "lg:order-2",
              )}
              imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />

            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-display text-[clamp(1.85rem,2.8vw,2.75rem)] font-light leading-tight text-cream">
                    {room.name}
                  </h2>
                  <p className="mt-3 text-sm text-cream-dim">{room.blurb}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-3xl text-gold">
                    ₹{room.price.toLocaleString("en-IN")}
                  </p>
                  <p className="eyebrow mt-1.5 text-cream-dim/50">per night</p>
                </div>
              </div>

              <p className="mt-7 text-sm leading-relaxed text-cream-dim">
                {room.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-cream/10 py-5">
                <Spec icon={<Users size={14} />} label={`Sleeps ${room.guests}`} />
                <Spec icon={<Maximize size={14} />} label={room.size} />
                <Spec icon={<BedDouble size={14} />} label={room.bed} />
              </div>

              <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2.5 text-sm text-cream-dim"
                  >
                    <Check size={13} className="shrink-0 text-gold/70" />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={`/book?type=room&room=${room.slug}`}
                  className="group/btn relative overflow-hidden rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink"
                >
                  <span className="relative z-10">Book this room</span>
                  <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                </Link>
                <Link
                  href={`/book?type=room&room=${room.slug}#availability`}
                  className="rounded-full border border-cream/25 px-7 py-3.5 text-sm text-cream transition-colors hover:border-gold/50 hover:text-gold"
                >
                  Check availability
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-sm text-cream-dim">
      <span className="text-gold/60">{icon}</span>
      {label}
    </span>
  );
}
