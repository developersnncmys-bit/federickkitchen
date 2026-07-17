"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const slides = [
  { img: "/images/restaurant-tree.jpg", label: "Garden dining", href: "/dining" },
  { img: "/images/room-executive.jpg", label: "The Estate Suite", href: "/rooms" },
  { img: "/images/lounge-brick.jpg", label: "The lounge", href: "/experiences" },
  { img: "/images/restaurant-garden.jpg", label: "The green hall", href: "/gallery" },
  { img: "/images/exterior-tower.jpg", label: "The house at night", href: "/about" },
  { img: "/images/restaurant-nook.jpg", label: "Morning coffee", href: "/dining" },
  { img: "/images/corridor-a.jpg", label: "The long verandah", href: "/gallery" },
  { img: "/images/room-deluxe.jpg", label: "The Planter's Room", href: "/rooms" },
];

export default function CursorSlider() {
  const px = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  // Cursor across the width slides the wider-than-screen track.
  const x = useTransform(spx, [0, 1], ["3%", "-63%"]);

  return (
    <section
      onMouseMove={(e) => px.set(e.clientX / window.innerWidth)}
      onMouseLeave={() => px.set(0.5)}
      className="relative overflow-hidden border-y border-cream/10 bg-ink-soft py-7 md:py-9"
    >
      {/* Desktop: cursor-driven slide */}
      <motion.div style={{ x }} className="hidden w-max gap-5 px-6 will-change-transform lg:flex">
        {slides.map((s) => (
          <Card key={s.label} {...s} />
        ))}
      </motion.div>

      {/* Mobile: swipe */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((s) => (
          <div key={s.label} className="snap-center">
            <Card {...s} />
          </div>
        ))}
      </div>

      <p className="eyebrow pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-cream-dim/50 lg:block">
        ← Move your cursor to slide →
      </p>
    </section>
  );
}

function Card({ img, label, href }: { img: string; label: string; href: string }) {
  return (
    <Link
      href={href}
      data-cursor
      className="group relative block h-[240px] w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-[280px] sm:w-[400px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={label}
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
        <span className="font-display text-xl text-white">{label}</span>
        <span className="inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/40 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}
