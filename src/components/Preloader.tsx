"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic intro: a dark curtain with the brand mark that counts in, then
 * wipes up to reveal the site. Locks scroll while it plays.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }, 2200);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#17130d]"
        >
          <motion.img
            src="/images/logo.png"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="h-24 w-auto md:h-28"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="eyebrow mt-6 text-gold-soft"
          >
            Frederick&rsquo;s Kitchen · Chikmagaluru
          </motion.p>
          <div className="mt-8 h-px w-44 overflow-hidden bg-white/15">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.7, ease: EASE }}
              className="h-full w-full bg-gold"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
