"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Frame from "@/components/Frame";

const pillars = [
  {
    kicker: "Fine dining",
    title: "Frederick's Kitchen",
    copy: "A Malnad table — pandi curry three hours in the pot, river fish under estate pepper, and the estate's own filter coffee.",
    href: "/dining",
    cta: "See the menu",
    image: "/images/restaurant-tree.jpg",
    tone: "from-[#5a3423] via-[#2c1b12] to-[#120c08]",
  },
  {
    kicker: "The stay",
    title: "Four Premium Rooms",
    copy: "Valley-facing suites, a restored planter's room, and a ground-floor room built for riders arriving late and filthy.",
    href: "/rooms",
    cta: "See the rooms",
    image: "/images/room-executive.jpg",
    tone: "from-[#4a3a24] via-[#2a2013] to-[#12100a]",
  },
  {
    kicker: "Out there",
    title: "Ridge & Estate",
    copy: "Three routes we ride ourselves, mapped honestly. A working plantation walk that ends at the cupping table.",
    href: "/experiences",
    cta: "See experiences",
    image: "/images/restaurant-garden.jpg",
    tone: "from-[#2b3a44] via-[#1a2228] to-[#0d1013]",
  },
];

export default function Pillars() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="grid gap-5 lg:grid-cols-3"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.href}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <Link href={p.href} className="group block h-full">
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-ink-soft transition-colors duration-500 hover:border-gold/30">
                <Frame
                  tone={p.tone}
                  src={p.image}
                  alt={p.title}
                  parallax
                  className="h-60 w-full"
                  imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />

                <div className="flex flex-1 flex-col p-7">
                  <span className="eyebrow text-gold/70">{p.kicker}</span>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-cream-dim">
                    {p.copy}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm text-gold">
                    {p.cta}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
