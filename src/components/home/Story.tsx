"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealWords } from "@/components/motion";
import Frame from "@/components/Frame";

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-20"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative">
          <div className="relative h-[420px] overflow-hidden rounded-2xl md:h-[560px]">
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
              <Frame
                tone="from-[#4a3a24] via-[#2a2013] to-[#12100a]"
                src="/images/restaurant-benches.jpg"
                alt="The garden dining room at Frederick's Kitchen"
                className="h-full w-full"
              />
            </motion.div>
          </div>

          {/* Floating stat card, drifting against the image */}
          <motion.div
            style={{ y: cardY }}
            className="absolute -bottom-10 -right-4 hidden w-52 rounded-xl border border-cream/10 bg-ink/90 p-6 backdrop-blur-xl md:block lg:-right-10"
          >
            <p className="font-display text-5xl text-gold">1,120</p>
            <p className="eyebrow mt-2 text-cream-dim">metres above sea</p>
            <div className="my-5 h-px bg-cream/10" />
            <p className="font-display text-5xl text-gold">32</p>
            <p className="eyebrow mt-2 text-cream-dim">acres of Arabica</p>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <span className="eyebrow text-gold/70">The house</span>
          </Reveal>

          <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            <RevealWords text="Everything on the plate begins within a kilometre of it." />
          </h2>

          <Reveal delay={0.15}>
            <div className="mt-8 space-y-5 leading-relaxed text-cream-dim">
              <p>
                Frederick&rsquo;s is a working coffee estate before it is anything
                else. The Arabica on the slope is pulped in our own yard, dried on
                our own beds, and roasted in Chikmagaluru each week. The pepper on
                the fish comes off the vines by the drying yard. The kitchen garden
                is thirty steps from the pass.
              </p>
              <p>
                The house has four rooms. That is a deliberate number — it is the
                most we can look after properly. It means the cook knows your name
                by the second morning, and that if you want breakfast at six because
                you are chasing the light up Baba Budangiri, you simply say so the
                night before.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-cream/10 pt-9 sm:grid-cols-3">
              {[
                { k: "Rooms", v: "Four" },
                { k: "Kitchen", v: "Malnad" },
                { k: "Routes", v: "Three, mapped" },
                { k: "Parking", v: "Covered, secure" },
                { k: "Walk", v: "Daily, 7am" },
                { k: "Reply", v: "Within 24h" },
              ].map((f) => (
                <div key={f.k}>
                  <p className="eyebrow text-cream-dim/50">{f.k}</p>
                  <p className="mt-2 font-display text-2xl text-cream">{f.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
