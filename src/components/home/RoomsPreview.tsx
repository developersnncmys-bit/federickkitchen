"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Maximize, BedDouble, ArrowUpRight } from "lucide-react";
import { rooms } from "@/lib/site";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function RoomsPreview() {
  const [active, setActive] = useState(0);
  const room = rooms[active];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <span className="eyebrow text-gold/80">The stay</span>
          </Reveal>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.04] tracking-[-0.01em] text-cream">
            <RevealWords text="Four rooms, each onto the estate." />
          </h2>
        </div>
        <Reveal delay={0.1}>
          <Link
            href="/rooms"
            data-cursor
            className="hidden items-center gap-2 rounded-full border border-gold/40 px-7 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-white md:inline-flex"
          >
            View all rooms <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </div>

      {/* Desktop: interactive selector */}
      <div className="mt-12 hidden grid-cols-2 gap-12 lg:grid">
        {/* List */}
        <Stagger className="flex flex-col justify-center">
          {rooms.map((r, i) => {
            const isActive = active === i;
            return (
              <StaggerItem key={r.slug}>
                <Link
                  href={`/book?type=room&room=${r.slug}`}
                  data-cursor
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group block border-b border-cream/10 py-6"
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`font-display text-lg transition-colors duration-300 ${
                        isActive ? "text-gold" : "text-cream-dim/40"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-display text-[clamp(1.6rem,2.6vw,2.5rem)] font-light leading-tight transition-all duration-300 ${
                          isActive
                            ? "translate-x-1 text-cream"
                            : "text-cream-dim/70"
                        }`}
                      >
                        {r.name}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden text-sm text-cream-dim"
                          >
                            <span className="block pt-2">{r.blurb}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <span
                      className={`font-display text-xl transition-colors duration-300 ${
                        isActive ? "text-gold" : "text-cream-dim/40"
                      }`}
                    >
                      {inr(r.price)}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-gold opacity-100"
                          : "-translate-x-2 text-cream-dim opacity-0"
                      }`}
                    />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Image panel */}
        <Reveal>
          <div className="relative h-[560px] overflow-hidden rounded-[2rem] border border-cream/10">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={room.slug}
                src={room.image}
                alt={room.name}
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/20" />

            {/* Details overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={room.slug}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-x-0 bottom-0 p-9"
              >
                <span className="eyebrow text-gold-soft">
                  0{active + 1} — {room.name}
                </span>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
                  {room.description.split(". ")[0]}.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={13} className="text-gold-soft" /> Sleeps {room.guests}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize size={13} className="text-gold-soft" /> {room.size}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble size={13} className="text-gold-soft" /> {room.bed}
                  </span>
                </div>
                <Link
                  href={`/book?type=room&room=${room.slug}`}
                  data-cursor
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-soft"
                >
                  Reserve — {inr(room.price)}/night
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Mobile: stacked cards */}
      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:hidden">
        {rooms.map((r, i) => (
          <StaggerItem key={r.slug}>
            <Link href={`/book?type=room&room=${r.slug}`} className="group block overflow-hidden rounded-2xl border border-cream/10 bg-paper">
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute right-3 top-3 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium text-cream">{inr(r.price)} / night</span>
              </div>
              <div className="p-6">
                <span className="font-display text-sm text-gold">0{i + 1}</span>
                <h3 className="mt-1 font-display text-2xl text-cream">{r.name}</h3>
                <p className="mt-2 text-sm text-cream-dim">{r.blurb}</p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-10 text-center md:hidden">
        <Link href="/rooms" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-8 py-3.5 text-sm text-gold">
          View all rooms <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
