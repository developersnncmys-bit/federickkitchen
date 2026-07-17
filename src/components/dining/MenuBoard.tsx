"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Star } from "lucide-react";
import { menu } from "@/lib/site";
import { clsx } from "@/lib/clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MenuBoard() {
  const [active, setActive] = useState(menu[0].id);
  const category = menu.find((c) => c.id === active)!;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-16">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 border-b border-cream/10 pb-5">
        {menu.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={clsx(
              "relative rounded-full px-5 py-2.5 text-sm transition-colors",
              active === c.id ? "text-ink" : "text-cream-dim hover:text-cream",
            )}
          >
            {active === c.id && (
              <motion.span
                layoutId="menu-pill"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ duration: 0.5, ease: EASE }}
              />
            )}
            <span className="relative z-10">{c.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-10"
        >
          <p className="max-w-2xl text-sm leading-relaxed text-cream-dim/80">
            {category.note}
          </p>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2"
          >
            {category.items.map((item) => (
              <motion.li
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                className="group border-b border-cream/[0.07] pb-8"
              >
                <div className="flex items-baseline gap-4">
                  <h3 className="font-display text-2xl leading-snug text-cream transition-colors group-hover:text-gold-soft md:text-[1.75rem]">
                    {item.name}
                  </h3>

                  {/* Leader dots — the printed-menu detail that sells it */}
                  <span className="mt-2 h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(245,239,228,0.22)_0_2px,transparent_2px_7px)]" />

                  <span className="font-display text-2xl text-gold">
                    ₹{item.price}
                  </span>
                </div>

                <div className="mt-3 flex items-start gap-3">
                  {item.veg && (
                    <Leaf
                      size={14}
                      className="mt-1 shrink-0 text-moss"
                      aria-label="Vegetarian"
                    />
                  )}
                  <p className="text-sm leading-relaxed text-cream-dim">
                    {item.description}
                  </p>
                </div>

                {item.chefSpecial && (
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1">
                    <Star size={11} className="fill-gold text-gold" />
                    <span className="eyebrow text-gold">Chef&rsquo;s special</span>
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
