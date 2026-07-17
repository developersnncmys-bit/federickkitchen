"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/motion";

const items = [
  { src: "/images/restaurant-wide.jpg", kicker: "The kitchen", title: "A table under the trees", href: "/dining" },
  { src: "/images/room-executive.jpg", kicker: "The rooms", title: "Four rooms, well kept", href: "/rooms" },
  { src: "/images/lounge-brick.jpg", kicker: "The lounge", title: "Somewhere to sit long", href: "/experiences" },
  { src: "/images/restaurant-garden.jpg", kicker: "The hall", title: "Room for the party", href: "/experiences" },
  { src: "/images/exterior-tower.jpg", kicker: "The house", title: "Lit on the hill", href: "/about" },
];

export default function ExpandingGallery() {
  const [active, setActive] = useState(1);

  return (
    <section className="relative overflow-hidden border-y border-cream/10 bg-ink py-14 md:py-20">
      <div className="absolute left-1/2 top-0 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="relative mx-auto mb-10 max-w-[1400px] px-6 md:mb-14 md:px-10">
        <Reveal>
          <span className="eyebrow text-gold/80">The estate, in passing</span>
        </Reveal>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
          <RevealWords text="Rooms, table, and ridge — hover to step inside." />
        </h2>
      </div>

      {/* Desktop: expanding accordion */}
      <div className="mx-auto hidden max-w-[1500px] gap-3 px-6 md:px-10 lg:flex lg:h-[68vh]">
        {items.map((it, i) => {
          const isActive = active === i;
          return (
            <Link
              key={it.title}
              href={it.href}
              data-cursor
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative min-w-0 overflow-hidden rounded-[1.75rem] border border-white/10 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ flexGrow: isActive ? 5 : 1, flexBasis: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.src}
                alt={it.title}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "scale-105" : "scale-125"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />

              {/* Collapsed: vertical label */}
              <span
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-[0.28em] text-white/80 transition-opacity duration-300 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
                style={{ writingMode: "vertical-rl" }}
              >
                {it.kicker}
              </span>

              {/* Index chip */}
              <span
                className={`absolute left-5 top-5 font-display text-xl text-white/60 transition-opacity duration-300 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                0{i + 1}
              </span>

              {/* Expanded: full caption */}
              <div
                className={`absolute inset-x-0 bottom-0 p-8 transition-all duration-500 md:p-10 ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gold-soft" />
                  <span className="eyebrow text-gold-soft">{it.kicker}</span>
                </div>
                <h3 className="mt-3 font-display text-[clamp(1.8rem,2.4vw,2.75rem)] font-light leading-tight text-white">
                  {it.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-white">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-gold-soft group-hover:bg-gold-soft group-hover:text-black">
                    <ArrowUpRight size={15} />
                  </span>
                  Explore
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: horizontal swipe */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it, i) => (
          <Link
            key={it.title}
            href={it.href}
            className="relative block h-[62vh] w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.title} loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <span className="absolute left-5 top-5 font-display text-xl text-white/60">0{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="eyebrow text-gold-soft">{it.kicker}</span>
              <h3 className="mt-2 font-display text-3xl font-light text-white">{it.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
