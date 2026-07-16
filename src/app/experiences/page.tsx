import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import InquiryForm from "@/components/InquiryForm";
import CtaBand from "@/components/CtaBand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { experiences } from "@/lib/site";
import { clsx } from "@/lib/clsx";

export const metadata: Metadata = {
  title: "Experiences — Ridge Routes & Plantation Walks",
  description:
    "Three mapped biker routes off the Western Ghats with covered secure parking and gear rails, a working coffee plantation walk ending at the cupping table, and private events on the estate.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Out there"
        title="The reason to come up, not just the place to sleep."
        copy="We ride these roads and work these rows ourselves, so what follows is honest rather than promotional — including the bits that are broken after the monsoon."
        image="/images/lounge-mandala.jpg"
        tone="from-[#22303a] via-[#161d21] to-[#0e0d0b]"
      />

      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="space-y-24 md:space-y-36">
          {experiences.map((exp, i) => (
            <section key={exp.slug} id={exp.slug} className="scroll-mt-28">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={clsx(i % 2 === 1 && "lg:order-2")}>
                  <Frame
                    tone={exp.tone}
                    src={exp.image}
                    alt={exp.title}
                    label={exp.title}
                    parallax
                    className="h-[340px] rounded-2xl md:h-[520px]"
                  />
                </Reveal>

                <div>
                  <Reveal>
                    <span className="eyebrow text-gold/70">{exp.kicker}</span>
                    <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] text-cream">
                      {exp.title}
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      <Meta label="Duration" value={exp.duration} />
                      <Meta label="Best for" value={exp.bestFor} />
                    </div>

                    <p className="mt-7 leading-relaxed text-cream-dim">
                      {exp.description}
                    </p>
                  </Reveal>

                  <Stagger className="mt-9 space-y-0 border-t border-cream/10">
                    {exp.details.map((d) => (
                      <StaggerItem key={d.label}>
                        <div className="grid gap-1 border-b border-cream/10 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                          <p className="eyebrow pt-1 text-gold/60">{d.label}</p>
                          <p className="text-sm leading-relaxed text-cream-dim">
                            {d.value}
                          </p>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Enquiry */}
      <section className="border-t border-cream/10 bg-ink-soft">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <span className="eyebrow text-gold/70">Plan it with us</span>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.5vw,3.25rem)] font-light leading-[1.05] text-cream">
                Private events & corporate offsites.
              </h2>
              <p className="mt-7 leading-relaxed text-cream-dim">
                Tell us the shape of the thing — how many, how long, and what it&rsquo;s
                for. We&rsquo;ll tell you honestly whether we can do it well, and what
                it would cost. Two weeks&rsquo; lead time for the long table, four for
                the full house.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <InquiryForm
              subject="Experiences & events"
              heading="Experience enquiry"
              blurb="Riders, planters, and teams — same form, and a person reads all of it."
              placeholder="e.g. Four riders up from Bengaluru on the 14th, want the Kemmangundi run and a 6am breakfast."
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Book the room. The ridge is free."
        copy="Route notes, covered parking, and breakfast at six come with the stay — we don't charge for the things that should be included."
      />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="eyebrow text-cream-dim/40">{label}</span>
      <span className="text-sm text-cream">{value}</span>
    </span>
  );
}
