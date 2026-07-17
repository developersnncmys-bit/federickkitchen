"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/site";
import { Reveal } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const t = testimonials[index];

  const go = (step: number) =>
    setState(([i]) => [
      (i + step + testimonials.length) % testimonials.length,
      step,
    ]);

  return (
    <section className="grain relative overflow-hidden border-y border-cream/10 bg-ink-soft py-14 md:py-20">
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <span className="eyebrow text-gold/70">From real guests</span>
        </Reveal>

        <div className="relative mt-10 min-h-[300px] sm:min-h-[260px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-light leading-[1.3] text-cream">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-9">
                <p className="text-cream">{t.name}</p>
                <p className="eyebrow mt-2 text-cream-dim/60">{t.context}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="rounded-full border border-cream/15 p-3 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Testimonials">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Testimonial ${i + 1}`}
                aria-selected={i === index}
                role="tab"
                className="p-1.5"
              >
                <span
                  className={
                    i === index
                      ? "block h-1.5 w-6 rounded-full bg-gold transition-all duration-500"
                      : "block h-1.5 w-1.5 rounded-full bg-cream/25 transition-all duration-500"
                  }
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="rounded-full border border-cream/15 p-3 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
