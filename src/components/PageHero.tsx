import { RevealWords, Reveal } from "@/components/motion";
import ParallaxImage from "@/components/ParallaxImage";
import { clsx } from "@/lib/clsx";

export default function PageHero({
  eyebrow,
  title,
  copy,
  image,
  tone = "from-[#2a2114] via-[#171410] to-[#0e0d0b]",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  tone?: string;
}) {
  return (
    <section
      className={clsx(
        "grain relative overflow-hidden bg-gradient-to-b pb-20 pt-40 md:pb-28 md:pt-52",
        tone,
      )}
    >
      {image && (
        <>
          <ParallaxImage src={image} eager imgClassName="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink" />
        </>
      )}
      <div className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal y={16}>
          <span className="eyebrow text-gold/70">{eyebrow}</span>
        </Reveal>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[1] tracking-[-0.02em] text-cream">
          <RevealWords text={title} />
        </h1>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream-dim md:text-lg">
            {copy}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
