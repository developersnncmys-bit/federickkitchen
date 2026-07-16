"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Frame from "@/components/Frame";

const EASE = [0.16, 1, 0.3, 1] as const;

const panels = [
  {
    image: "/images/restaurant-tree.jpg",
    kicker: "01 — The kitchen",
    title: "A table under the trees",
    copy: "Malnad cooking in a garden dining room, with the estate's own coffee to finish.",
    href: "/dining",
  },
  {
    image: "/images/room-executive.jpg",
    kicker: "02 — The rooms",
    title: "Four rooms, well kept",
    copy: "Valley-facing suites and a rider's room built for late, muddy arrivals.",
    href: "/rooms",
  },
  {
    image: "/images/lounge-brick.jpg",
    kicker: "03 — The lounge",
    title: "Somewhere to sit long",
    copy: "Brick, leather, and low light — the room where the evening slows down.",
    href: "/experiences",
  },
  {
    image: "/images/restaurant-garden.jpg",
    kicker: "04 — The hall",
    title: "Room for the whole party",
    copy: "The green hall takes a long table of twenty-four, or a group that took the house.",
    href: "/experiences",
  },
  {
    image: "/images/exterior-tower.jpg",
    kicker: "05 — The house",
    title: "Lit up on the hill",
    copy: "Ten minutes from a ridge worth waking for, and a light left on however late you ride in.",
    href: "/about",
  },
];

/**
 * Pinned horizontal scroll: the section is tall, and while it's pinned the
 * panels translate sideways in step with vertical scroll. Desktop only — on
 * touch/narrow screens it degrades to an ordinary horizontal swipe strip.
 */
export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Move the track from 0 to -(panels beyond the first). Tuned to leave the
  // last panel resting fully in view rather than flush against the edge.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-82%"]);

  return (
    <section className="border-y border-cream/10 bg-ink-soft">
      {/* Heading */}
      <div className="mx-auto max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="eyebrow text-gold/70"
        >
          The spaces
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] text-cream"
        >
          One house, five rooms to be in.
        </motion.h2>
        <p className="mt-5 max-w-md text-sm text-cream-dim/70 lg:hidden">
          Swipe through &rarr;
        </p>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div ref={ref} className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 px-10 will-change-transform">
            {panels.map((p) => (
              <ShowcaseCard key={p.title} {...p} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: native horizontal swipe */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-14 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {panels.map((p) => (
          <div key={p.title} className="w-[82vw] shrink-0 snap-center">
            <ShowcaseCard {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ShowcaseCard({
  image,
  kicker,
  title,
  copy,
  href,
}: (typeof panels)[number]) {
  return (
    <Link
      href={href}
      className="group relative block h-[64vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-cream/10 sm:w-[62vw] lg:h-[68vh] lg:w-[46vw]"
    >
      <Frame
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-11">
        <span className="eyebrow text-gold-soft">{kicker}</span>
        <h3 className="mt-4 font-display text-[clamp(1.9rem,3vw,3rem)] font-light leading-tight text-cream">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
          {copy}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
          Explore
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
