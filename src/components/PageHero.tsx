import { RevealWords, Reveal } from "@/components/motion";
import ParallaxImage from "@/components/ParallaxImage";
import { clsx } from "@/lib/clsx";

export default function PageHero({
  eyebrow,
  title,
  copy,
  image,
  // Kept for API compatibility; the light theme uses one warm ivory wash
  // instead of a per-page dark gradient.
  tone: _tone,
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
        "grain relative overflow-hidden bg-gradient-to-b from-paper via-ink to-ink-soft pb-14 pt-28 md:pb-16 md:pt-36",
      )}
    >
      {image && (
        <>
          <ParallaxImage src={image} eager imgClassName="opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/85 to-ink" />
        </>
      )}
      <div className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/[0.10] blur-[100px]" />

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
