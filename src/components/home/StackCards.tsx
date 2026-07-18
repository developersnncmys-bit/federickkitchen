"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    n: "01",
    label: "Dining",
    title: "A Malnad table under the trees",
    copy: "Pandi curry three hours in the pot, river fish under estate pepper, and the estate's own filter coffee to finish.",
    img: "/images/restaurant-tree.jpg",
    href: "/dining",
  },
  {
    n: "02",
    label: "Rooms",
    title: "Four rooms, kept the way you'd keep your own",
    copy: "Valley-facing suites, a restored planter's room, and a ground-floor room built for riders arriving late.",
    img: "/images/room-executive.jpg",
    href: "/rooms",
  },
  {
    n: "03",
    label: "Experiences",
    title: "Ridge routes and a plantation walk",
    copy: "Three routes we ride ourselves, mapped honestly. A working plantation walk that ends at the cupping table.",
    img: "/images/restaurant-garden.jpg",
    href: "/experiences",
  },
  {
    n: "04",
    label: "The house",
    title: "Lit up on the hill, a light left on",
    copy: "Ten minutes from a ridge worth waking for, and a light left on however late you ride in.",
    img: "/images/exterior-tower.jpg",
    href: "/about",
  },
];

export default function StackCards() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative bg-ink">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <span className="eyebrow text-gold/80">The house</span>
        </Reveal>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.04] tracking-[-0.01em] text-cream">
          <RevealWords text="Four ways into the estate, one at a time." />
        </h2>
      </div>

      <div ref={container} className="relative">
        {cards.map((c, i) => (
          <CardItem
            key={c.n}
            card={c}
            i={i}
            total={cards.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function CardItem({
  card,
  i,
  total,
  progress,
}: {
  card: (typeof cards)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Earlier cards shrink as the later ones stack over them.
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-6 md:px-10">
      <motion.div
        style={{ scale, top: `${i * 26}px` }}
        className="relative grid h-[62vh] max-h-[560px] w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.8)] md:grid-cols-2"
      >
        {/* Text side */}
        <div className="relative z-10 flex flex-col justify-center bg-ink-soft p-9 md:p-14">
          <span className="font-display text-5xl font-light text-gold/30">{card.n}</span>
          <span className="eyebrow mt-6 text-gold">{card.label}</span>
          <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,3rem)] font-light leading-[1.05] text-cream">
            {card.title}
          </h3>
          <p className="mt-5 max-w-md leading-relaxed text-cream-dim">{card.copy}</p>
          <Link
            href={card.href}
            data-cursor
            className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-soft"
          >
            Explore
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Image side */}
        <div className="relative min-h-[220px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.img}
            alt={card.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-ink-soft md:via-transparent md:to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
