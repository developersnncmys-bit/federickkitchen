import { Reveal } from "@/components/motion";

const stats = [
  { k: "Guest rating", v: "9.4", s: "/ 10" },
  { k: "Rooms", v: "4", s: "kept properly" },
  { k: "On the estate", v: "32", s: "acres Arabica" },
  { k: "Reply within", v: "24", s: "hours" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-cream/10 bg-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-6 py-8 md:grid-cols-4 md:px-10 md:py-10">
        {stats.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center md:flex-row md:items-baseline md:justify-center md:gap-3 md:text-left">
              <span className="font-display text-4xl font-light text-gold md:text-5xl">
                {s.v}
              </span>
              <span className="mt-1 md:mt-0">
                <span className="block text-sm text-cream">{s.s}</span>
                <span className="eyebrow text-cream-dim/60">{s.k}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
