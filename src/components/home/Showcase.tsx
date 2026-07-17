"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const panels = [
  {
    n: "01",
    image: "/images/restaurant-tree.jpg",
    kicker: "The kitchen",
    title: "A table under the trees",
    copy: "Malnad cooking in a garden dining room, with the estate's own coffee to finish.",
    href: "/dining",
  },
  {
    n: "02",
    image: "/images/room-executive.jpg",
    kicker: "The rooms",
    title: "Four rooms, well kept",
    copy: "Valley-facing suites and a rider's room built for late, muddy arrivals.",
    href: "/rooms",
  },
  {
    n: "03",
    image: "/images/lounge-brick.jpg",
    kicker: "The lounge",
    title: "Somewhere to sit long",
    copy: "Brick, leather, and low light — the room where the evening slows down.",
    href: "/experiences",
  },
  {
    n: "04",
    image: "/images/restaurant-garden.jpg",
    kicker: "The hall",
    title: "Room for the whole party",
    copy: "The green hall takes a long table of twenty-four, or a group that took the house.",
    href: "/experiences",
  },
  {
    n: "05",
    image: "/images/exterior-tower.jpg",
    kicker: "The house",
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

  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-82%"]);
  // A faint parallax on the image layer as the track slides, for depth.
  const imgX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="grain border-y border-cream/10 bg-ink-soft">
      {/* Heading */}
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-6 pt-16 md:px-10 md:pt-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="eyebrow text-gold/80"
          >
            The spaces
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] text-cream"
          >
            One house, five rooms to be in.
          </motion.h2>
        </div>
        <p className="eyebrow hidden text-cream-dim/50 lg:block">Scroll to explore &darr;</p>
        <p className="mt-1 text-sm text-cream-dim/70 lg:hidden">Swipe through &rarr;</p>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div ref={ref} className="relative hidden h-[340vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-7 px-10 will-change-transform">
            {panels.map((p) => (
              <ShowcaseCard key={p.title} {...p} imgX={imgX} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: native horizontal swipe */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-12 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {panels.map((p) => (
          <div key={p.title} className="w-[84vw] shrink-0 snap-center">
            <ShowcaseCard {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ShowcaseCard({
  n,
  image,
  kicker,
  title,
  copy,
  href,
  imgX,
}: (typeof panels)[number] & { imgX?: import("framer-motion").MotionValue<string> }) {
  return (
    <Link
      href={href}
      data-cursor
      className="group relative block h-[66vh] w-[84vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.7)] sm:w-[64vw] lg:h-[70vh] lg:w-[47vw]"
    >
      {/* Image with a slow zoom on hover + gentle scroll parallax */}
      <motion.div style={imgX ? { x: imgX } : undefined} className="absolute inset-[-8%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full scale-110 object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125"
        />
      </motion.div>

      {/* Dark scrim so the copy is always legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent" />

      {/* Big index watermark */}
      <span className="absolute right-7 top-5 font-display text-[5rem] font-light leading-none text-white/15 md:text-[7rem]">
        {n}
      </span>

      {/* Copy */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-11">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold-soft" />
          <span className="eyebrow text-gold-soft">{kicker}</span>
        </div>
        <h3 className="mt-4 font-display text-[clamp(1.9rem,3vw,3.1rem)] font-light leading-tight text-white">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
          {copy}
        </p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-gold-soft group-hover:bg-gold-soft group-hover:text-black">
            <ArrowUpRight size={15} />
          </span>
          Explore
        </span>
      </div>
    </Link>
  );
}
