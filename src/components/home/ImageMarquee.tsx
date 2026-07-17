"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const rowA = [
  "/images/restaurant-wide.jpg",
  "/images/room-executive.jpg",
  "/images/restaurant-tree.jpg",
  "/images/lounge-brick.jpg",
  "/images/restaurant-garden.jpg",
  "/images/exterior-tower.jpg",
];
const rowB = [
  "/images/restaurant-nook.jpg",
  "/images/room-deluxe.jpg",
  "/images/corridor-a.jpg",
  "/images/restaurant-benches.jpg",
  "/images/restaurant-lounge.jpg",
  "/images/room-standard.jpg",
];

function Tile({ src }: { src: string }) {
  return (
    <div className="relative h-[170px] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-cream/10 sm:h-[210px] sm:w-[330px] md:h-[250px] md:w-[390px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
    </div>
  );
}

function Row({ images, baseVelocity }: { images: string[]; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velFactor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const vf = velFactor.get();
    if (vf < 0) dir.current = -1;
    else if (vf > 0) dir.current = 1;
    moveBy += dir.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div style={{ x }} className="flex gap-4 will-change-transform md:gap-5">
      {[...images, ...images].map((src, i) => (
        <Tile key={i} src={src} />
      ))}
    </motion.div>
  );
}

/** Two infinite image rows sliding opposite ways; scroll speeds them up. */
export default function ImageMarquee() {
  return (
    <section className="grain overflow-hidden border-y border-cream/10 bg-ink-soft py-5 md:py-7">
      <div className="flex flex-col gap-4 md:gap-5">
        <Row images={rowA} baseVelocity={-3.2} />
        <Row images={rowB} baseVelocity={3.2} />
      </div>
    </section>
  );
}
