"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Maximize, ArrowUpRight } from "lucide-react";
import { rooms } from "@/lib/site";
import { Reveal } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function RoomsPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
      <div className="text-center">
        <Reveal>
          <span className="eyebrow text-gold/80">The stay</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Four rooms, each looking onto the estate
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream-dim">
            From the corner suite over the coffee rows to the boot-friendly
            rider&rsquo;s room — choose the one that suits your stay.
          </p>
        </Reveal>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {rooms.map((room) => (
          <motion.div
            key={room.slug}
            variants={{
              hidden: { opacity: 0, y: 36 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_30px_60px_-40px_rgba(38,34,27,0.5)]">
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur">
                  ₹{room.price.toLocaleString("en-IN")}
                  <span className="text-cream-dim"> / night</span>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl leading-tight text-cream">
                  {room.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-dim">
                  {room.blurb}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-cream/10 pt-4 text-xs text-cream-dim">
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={13} className="text-gold" /> Sleeps {room.guests}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize size={13} className="text-gold" /> {room.size}
                  </span>
                </div>

                <Link
                  href={`/book?type=room&room=${room.slug}`}
                  className="mt-6 inline-flex items-center justify-between rounded-full border border-cream/15 px-5 py-3 text-sm text-cream transition-colors group-hover:border-gold/40 group-hover:text-gold"
                >
                  Reserve this room
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>

      <Reveal delay={0.1}>
        <div className="mt-12 text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-8 py-3.5 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
          >
            View all rooms
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
