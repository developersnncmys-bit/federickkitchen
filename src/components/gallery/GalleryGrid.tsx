"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Frame from "@/components/Frame";
import { gallery, galleryCategories, type GalleryItem } from "@/lib/site";
import { clsx } from "@/lib/clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fixed row height + spans, rather than per-tile aspect ratios: inside a grid
 * whose rows are 1fr, an aspect ratio and the row height fight each other and
 * the tiles balloon.
 */
const spanClass: Record<GalleryItem["span"], string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  square: "",
};

export default function GalleryGrid() {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<GalleryItem | null>(null);

  const items =
    filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  // Escape closes the lightbox, and the page behind it shouldn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open]);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-14">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={clsx(
              "relative rounded-full px-5 py-2.5 text-sm transition-colors",
              filter === c.id ? "text-ink" : "text-cream-dim hover:text-cream",
            )}
          >
            {filter === c.id && (
              <motion.span
                layoutId="gallery-pill"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
            <span className="relative z-10">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      <motion.div
        layout
        className="mt-10 grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[190px] sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={() => setOpen(item)}
              className={clsx(
                "group relative overflow-hidden rounded-xl border border-cream/10 text-left transition-colors hover:border-gold/30",
                spanClass[item.span],
              )}
            >
              <Frame
                src={item.image}
                alt={item.caption}
                className="h-full w-full"
                imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />

              <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-14">
                <span className="block translate-y-2 text-sm text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={open.caption}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-6 top-6 rounded-full border border-cream/15 p-3 text-cream transition-colors hover:border-gold/50 hover:text-gold"
            >
              <X size={18} />
            </button>

            <motion.figure
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <Frame
                src={open.image}
                alt={open.caption}
                scrim={false}
                className="aspect-[16/10] w-full rounded-2xl border border-cream/10"
              />
              <figcaption className="mt-5 text-center">
                <p className="font-display text-2xl text-cream">{open.caption}</p>
                <p className="eyebrow mt-2 text-cream-dim/50">
                  {galleryCategories.find((c) => c.id === open.category)?.label}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
