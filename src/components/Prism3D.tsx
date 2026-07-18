"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Ambient 3D glass prisms: CSS-3D cubes that rotate continuously and drift with
 * scroll, giving a "dark prism glass" background without any 3D library.
 * Non-interactive, low-opacity, and disabled for reduced-motion visitors.
 */
function faceTransforms(size: number) {
  const h = size / 2;
  return [
    `translateZ(${h}px)`,
    `rotateY(180deg) translateZ(${h}px)`,
    `rotateY(90deg) translateZ(${h}px)`,
    `rotateY(-90deg) translateZ(${h}px)`,
    `rotateX(90deg) translateZ(${h}px)`,
    `rotateX(-90deg) translateZ(${h}px)`,
  ];
}

function GlassCube({
  size,
  duration = 28,
  delay = 0,
  reverse = false,
}: {
  size: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      animate={{
        rotateX: reverse ? [360, 0] : [0, 360],
        rotateY: [0, 360],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      className="relative"
    >
      {faceTransforms(size).map((t, i) => (
        <span
          key={i}
          style={{ transform: t }}
          className="absolute inset-0 border border-white/30 bg-gradient-to-br from-white/25 via-gold/10 to-white/[0.03] shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]"
        />
      ))}
    </motion.div>
  );
}

export default function Prism3D() {
  const [ok, setOk] = useState(false);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  useEffect(() => {
    setOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (!ok) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      style={{ perspective: 1300 }}
    >
      <motion.div style={{ y: y1 }} className="absolute left-[5%] top-[16%] opacity-45">
        <GlassCube size={130} duration={32} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute right-[8%] top-[26%] opacity-30">
        <GlassCube size={90} duration={24} delay={2} reverse />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute right-[20%] bottom-[14%] opacity-40 lg:right-[24%]">
        <GlassCube size={160} duration={40} delay={1} />
      </motion.div>
      <motion.div style={{ y: y1 }} className="absolute left-[18%] bottom-[20%] hidden opacity-25 lg:block">
        <GlassCube size={72} duration={20} reverse />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute left-[46%] top-[8%] hidden opacity-20 md:block">
        <GlassCube size={64} duration={26} delay={3} />
      </motion.div>
    </div>
  );
}
