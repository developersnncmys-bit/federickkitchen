"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

/**
 * Cursor-reactive 3D glass prisms. The whole field tilts in 3D toward the
 * pointer and each prism parallaxes by its depth, on top of a continuous spin
 * and a scroll drift. Pure CSS-3D, no 3D library. Disabled for reduced-motion.
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
      animate={{ rotateX: reverse ? [360, 0] : [0, 360], rotateY: [0, 360] }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      className="relative"
    >
      {faceTransforms(size).map((t, i) => (
        <span
          key={i}
          style={{ transform: t }}
          className="absolute inset-0 border border-white/35 bg-gradient-to-br from-white/30 via-gold/15 to-white/[0.04] shadow-[inset_0_0_30px_rgba(255,255,255,0.18)]"
        />
      ))}
    </motion.div>
  );
}

function Prism({
  smx,
  smy,
  scrollY,
  depth,
  className,
  size,
  duration,
  delay,
  reverse,
}: {
  smx: MotionValue<number>;
  smy: MotionValue<number>;
  scrollY: MotionValue<number>;
  depth: number;
  className: string;
  size: number;
  duration: number;
  delay?: number;
  reverse?: boolean;
}) {
  const px = useTransform(smx, [-0.5, 0.5], [-depth * 0.5, depth * 0.5]);
  const py = useTransform(smy, [-0.5, 0.5], [-depth * 0.5, depth * 0.5]);
  return (
    <motion.div style={{ y: scrollY }} className={`absolute ${className}`}>
      <motion.div style={{ x: px, y: py, z: depth, transformStyle: "preserve-3d" }}>
        <GlassCube size={size} duration={duration} delay={delay} reverse={reverse} />
      </motion.div>
    </motion.div>
  );
}

export default function Prism3D() {
  const [ok, setOk] = useState(false);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // Pointer position, normalised to [-0.5, 0.5], smoothed.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });

  // Whole-scene tilt toward the cursor.
  const rotY = useTransform(smx, [-0.5, 0.5], [20, -20]);
  const rotX = useTransform(smy, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;
    setOk(true);
    if (!fine) return;
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  if (!ok) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        <Prism smx={smx} smy={smy} scrollY={y1} depth={220} size={130} duration={32} className="left-[5%] top-[16%] opacity-50" />
        <Prism smx={smx} smy={smy} scrollY={y2} depth={-140} size={90} duration={24} delay={2} reverse className="right-[8%] top-[26%] opacity-40" />
        <Prism smx={smx} smy={smy} scrollY={y3} depth={280} size={160} duration={40} delay={1} className="right-[20%] bottom-[14%] opacity-45 lg:right-[24%]" />
        <Prism smx={smx} smy={smy} scrollY={y1} depth={-90} size={72} duration={20} reverse className="left-[18%] bottom-[20%] hidden opacity-30 lg:block" />
        <Prism smx={smx} smy={smy} scrollY={y2} depth={160} size={64} duration={26} delay={3} className="left-[46%] top-[8%] hidden opacity-25 md:block" />
      </motion.div>
    </div>
  );
}
