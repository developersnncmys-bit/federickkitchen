"use client";

import Link from "next/link";
import { Coffee, ChefHat, Mountain, BedDouble, ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/motion";
import ParallaxImage from "@/components/ParallaxImage";

const features = [
  {
    icon: Coffee,
    title: "Estate-grown coffee",
    text: "Arabica pulped, dried, and roasted on the slope below your table.",
  },
  {
    icon: ChefHat,
    title: "A Malnad kitchen",
    text: "Pandi curry, river fish, and the estate's own pepper.",
  },
  {
    icon: Mountain,
    title: "Ridge routes, mapped",
    text: "Three rides off the Western Ghats, honestly noted.",
  },
  {
    icon: BedDouble,
    title: "Four premium rooms",
    text: "Valley-facing, kept the way you'd keep your own.",
  },
];

export default function WelcomeIntro() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Content */}
        <div>
          <Reveal>
            <span className="eyebrow text-gold/80">Welcome to Frederick&rsquo;s</span>
          </Reveal>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.04] tracking-[-0.01em] text-cream">
            <RevealWords text="A working coffee estate you can stay the night in." />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg leading-relaxed text-cream-dim">
              Frederick&rsquo;s is a coffee estate before it is anything else — a
              Malnad kitchen, four rooms, and ridge roads worth waking for, all on
              a single working slope high in the Western Ghats.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                    <f.icon size={19} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-cream">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream-dim">
                      {f.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <Link
              href="/about"
              data-cursor
              className="group mt-11 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-soft"
            >
              Our story
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Parallax image collage */}
        <Reveal delay={0.1}>
          <div className="relative h-[440px] md:h-[560px]">
            <div className="absolute right-0 top-0 h-[78%] w-[74%] overflow-hidden rounded-[1.75rem] border border-cream/10 shadow-[0_40px_80px_-50px_rgba(38,34,27,0.6)]">
              <ParallaxImage src="/images/restaurant-garden.jpg" alt="The garden dining hall" distance={12} />
            </div>
            <div className="absolute bottom-0 left-0 h-[46%] w-[52%] overflow-hidden rounded-[1.5rem] border-[6px] border-ink shadow-[0_30px_60px_-40px_rgba(38,34,27,0.6)]">
              <ParallaxImage src="/images/room-executive.jpg" alt="A valley-facing room" distance={20} />
            </div>

            {/* Floating stat card */}
            <div className="absolute right-4 top-[62%] rounded-2xl border border-cream/10 bg-paper/90 px-6 py-5 text-center backdrop-blur-xl md:right-2">
              <p className="font-display text-4xl font-light text-gold">1,120</p>
              <p className="eyebrow mt-1 text-cream-dim">metres up</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
