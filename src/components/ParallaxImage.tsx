"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx } from "@/lib/clsx";

/**
 * A background photo that drifts and gently zooms against the scroll, for depth.
 * The image is deliberately oversized (inset -18%) so the parallax travel never
 * exposes an edge. Works anywhere on the page — heroes, bands, or mid-section
 * panels — because it measures its own position in the viewport.
 */
export default function ParallaxImage({
  src,
  alt = "",
  className,
  imgClassName,
  distance = 14,
  zoom = 1.12,
  eager = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  /** How far the photo travels, in % of its own height. */
  distance?: number;
  /** Extra scale applied across the scroll, sells the depth. */
  zoom?: number;
  /** Load immediately (use for above-the-fold heroes). */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-distance}%`, `${distance}%`],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, zoom]);

  return (
    <div ref={ref} className={clsx("absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ y, scale }} className="absolute inset-[-18%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          aria-hidden={alt === "" ? "true" : undefined}
          loading={eager ? "eager" : "lazy"}
          className={clsx("h-full w-full object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}
