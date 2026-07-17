import Link from "next/link";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export default function CtaBand({
  title = "Two nights is the right amount.",
  copy = "One to arrive and eat. One to ride, walk the rows, and understand why people come back.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-16">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-paper via-ink to-ink-soft px-8 py-12 text-center shadow-[0_30px_80px_-40px_rgba(42,33,23,0.45)] md:px-16 md:py-16">
          <div className="absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[80px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] text-cream">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream-dim">
              {copy}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/book?type=room"
                className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink"
              >
                <span className="relative z-10">Check availability</span>
                <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-full border border-cream/25 px-8 py-4 text-sm text-cream transition-colors hover:text-ink"
              >
                <span className="relative z-10">WhatsApp us</span>
                <span className="absolute inset-0 -translate-y-full bg-cream transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
            </div>

            <p className="eyebrow mt-9 text-cream-dim/50">
              {site.responseAssurance}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
