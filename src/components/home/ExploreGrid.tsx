"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/motion";
import MotionShapes from "@/components/MotionShapes";

const EASE = [0.16, 1, 0.3, 1] as const;

const items = [
  { label: "Dining", sub: "Malnad kitchen", img: "/images/restaurant-tree.jpg", href: "/dining" },
  { label: "Rooms", sub: "Four premium rooms", img: "/images/room-executive.jpg", href: "/rooms" },
  { label: "Experiences", sub: "Ridge & estate", img: "/images/restaurant-garden.jpg", href: "/experiences" },
  { label: "Gallery", sub: "The whole house", img: "/images/lounge-brick.jpg", href: "/gallery" },
  { label: "The Estate", sub: "Our story", img: "/images/exterior-tower.jpg", href: "/about" },
];

export default function ExploreGrid() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <MotionShapes />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <span className="eyebrow text-gold/80">Explore</span>
        </Reveal>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.04] tracking-[-0.01em] text-cream">
          <RevealWords text="Step into every part of the house." />
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10 mx-auto mt-12 grid max-w-[1400px] grid-cols-2 gap-5 px-6 md:grid-cols-5 md:px-10"
      >
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
            className={`${i === 4 ? "col-span-2 md:col-span-1" : ""} ${
              i % 2 === 1 ? "md:mt-14" : ""
            }`}
          >
            <TiltCard {...it} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TiltCard({
  label,
  sub,
  img,
  href,
}: {
  label: string;
  sub: string;
  img: string;
  href: string;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15, mass: 0.5 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 45%)`;

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set(-(py - 0.5) * 18);
    gx.set(px * 100);
    gy.set(py * 100);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  }

  return (
    <div style={{ perspective: 900 }}>
      <motion.a
        href={href}
        data-cursor
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="group relative block h-[320px] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.7)] md:h-[440px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={label}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />
        {/* Cursor glare */}
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />

        {/* Content lifted in 3D */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="absolute inset-x-0 bottom-0 p-6"
        >
          <span className="eyebrow text-gold-soft">{sub}</span>
          <h3 className="mt-2 font-display text-2xl font-light leading-none text-white md:text-[1.75rem]">
            {label}
          </h3>
          <span className="mt-3 block h-px w-0 bg-gold-soft transition-all duration-500 group-hover:w-12" />
        </div>

        <span
          style={{ transform: "translateZ(60px)" }}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors group-hover:border-gold-soft group-hover:bg-gold-soft group-hover:text-black"
        >
          <ArrowUpRight size={16} />
        </span>
      </motion.a>
    </div>
  );
}
