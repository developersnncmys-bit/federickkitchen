"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { RevealWords, Reveal } from "@/components/motion";

/** Two editorial rows that slide past each other as the section scrolls. */
const rowTop = [
  { src: "/images/restaurant-wide.jpg", label: "The garden hall" },
  { src: "/images/room-executive.jpg", label: "The Estate Suite" },
  { src: "/images/restaurant-tree.jpg", label: "A table under the trees" },
  { src: "/images/room-deluxe.jpg", label: "The Planter's Room" },
  { src: "/images/restaurant-nook.jpg", label: "First pour" },
  { src: "/images/corridor-a.jpg", label: "The long verandah" },
];

const rowBottom = [
  { src: "/images/restaurant-garden.jpg", label: "The green hall" },
  { src: "/images/lounge-brick.jpg", label: "The reading lounge" },
  { src: "/images/restaurant-benches.jpg", label: "Benches in the green" },
  { src: "/images/room-standard.jpg", label: "The Rider's Room" },
  { src: "/images/restaurant-lounge.jpg", label: "Quiet corner" },
  { src: "/images/exterior-tower.jpg", label: "The house after dark" },
];

const SPRING = { stiffness: 90, damping: 28, mass: 0.6 };

export default function ScrollGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Springy so the slide feels weighted, not mechanical. Rows counter-slide.
  const xTop = useSpring(
    useTransform(scrollYProgress, [0, 1], ["2%", "-26%"]),
    SPRING,
  );
  const xBottom = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-26%", "2%"]),
    SPRING,
  );
  // The whole band lifts a touch as it passes — layered depth against the rows.
  const bandY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-cream/10 bg-ink py-14 md:py-16"
    >
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[130px]" />

      <div className="relative mx-auto mb-8 max-w-[1400px] px-6 md:mb-12 md:px-10">
        <Reveal>
          <span className="eyebrow text-gold/70">The estate, in passing</span>
        </Reveal>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
          <RevealWords text="Rooms, table, and ridge — the house as you'll move through it." />
        </h2>
      </div>

      <motion.div style={{ y: bandY }} className="flex flex-col gap-5 md:gap-6">
        <motion.div
          style={{ x: xTop }}
          className="flex w-max gap-5 pl-6 will-change-transform md:gap-6 md:pl-10"
        >
          {rowTop.map((it, i) => (
            <GalleryTile key={i} {...it} />
          ))}
        </motion.div>

        <motion.div
          style={{ x: xBottom }}
          className="flex w-max gap-5 pl-6 will-change-transform md:gap-6 md:pl-10"
        >
          {rowBottom.map((it, i) => (
            <GalleryTile key={i} {...it} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function GalleryTile({ src, label }: { src: string; label: string }) {
  return (
    <figure className="group grain relative h-[240px] w-[340px] shrink-0 overflow-hidden rounded-2xl border border-cream/10 sm:h-[300px] sm:w-[440px] md:h-[360px] md:w-[540px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <figcaption className="absolute bottom-5 left-6 z-10 flex items-center gap-2.5">
        <span className="h-px w-6 bg-gold-soft" />
        <span className="eyebrow text-white/90">{label}</span>
      </figcaption>
    </figure>
  );
}
