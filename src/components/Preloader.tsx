"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Intro screen (Sandra-Creates style): a full-bleed image with the brand mark,
 * that the visitor clicks to enter — the curtain then wipes up to reveal the
 * site. Scroll is locked until they enter.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    // Let the intro settle before inviting the click.
    const t = setTimeout(() => setReady(true), 900);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, []);

  function enter() {
    setDone(true);
    document.documentElement.classList.remove("lenis-stopped");
    document.body.style.overflow = "";
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          onClick={enter}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
          className="fixed inset-0 z-[10000] cursor-pointer overflow-hidden bg-[#17130d]"
        >
          {/* Full-bleed image with a slow zoom */}
          <motion.img
            src="/images/restaurant-hall.jpg"
            alt=""
            aria-hidden="true"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.55 }}
            transition={{ duration: 2.2, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

          {/* Brand + enter */}
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.img
              src="/images/logo.png"
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="h-24 w-auto md:h-28"
            />
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="mt-6 font-display text-4xl font-light text-white md:text-5xl"
            >
              Frederick&rsquo;s Kitchen
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="eyebrow mt-3 text-gold-soft"
            >
              A coffee estate in Chikmagaluru
            </motion.p>

            <AnimatePresence>
              {ready && (
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  onClick={enter}
                  className="group mt-12 inline-flex items-center gap-3 rounded-full border border-white/40 px-9 py-4 text-sm tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-soft opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-soft" />
                  </span>
                  Enter the estate
                </motion.button>
              )}
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="eyebrow absolute bottom-8 text-white/45"
            >
              Click anywhere to enter
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
