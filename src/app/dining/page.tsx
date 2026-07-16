import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MenuBoard from "@/components/dining/MenuBoard";
import InquiryForm from "@/components/InquiryForm";
import Frame from "@/components/Frame";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/motion";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { site, menu } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fine Dining — The Malnad Menu",
  description:
    "Frederick's Kitchen in Chikmagaluru: pandi curry, wood-fired estate chicken, pepper-rubbed river fish, and estate-grown single origin coffee. Book a table.",
  alternates: { canonical: "/dining" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Frederick's Kitchen — Menu",
  hasMenuSection: menu.map((c) => ({
    "@type": "MenuSection",
    name: c.title,
    hasMenuItem: c.items.map((i) => ({
      "@type": "MenuItem",
      name: i.name,
      description: i.description,
      offers: { "@type": "Offer", price: i.price, priceCurrency: "INR" },
      suitableForDiet: i.veg ? "https://schema.org/VegetarianDiet" : undefined,
    })),
  })),
};

export default function DiningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Fine dining"
        title="The kitchen cooks what the estate grows."
        copy="Malnad and Kodava cooking, done properly and without shortcuts. The pandi curry takes three hours. The coffee comes off the slope below the dining room. Lunch 12:30–15:00, dinner 19:30–22:30."
        image="/images/restaurant-nook.jpg"
        tone="from-[#3a2418] via-[#1d1410] to-[#0e0d0b]"
      />

      <MenuBoard />

      {/* Table reservation band */}
      <section className="border-y border-cream/10 bg-ink-soft">
        <div className="mx-auto grid max-w-[1400px] gap-0 lg:grid-cols-2">
          <Frame
            tone="from-[#5a3423] via-[#2c1b12] to-[#120c08]"
            src="/images/restaurant-wide.jpg"
            alt="The dining room at Frederick's Kitchen"
            className="min-h-[320px] lg:min-h-[520px]"
          />

          <div className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-20">
            <Reveal>
              <span className="eyebrow text-gold/70">Reserve</span>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.5vw,3.25rem)] font-light leading-[1.05] text-cream">
                Book a table, or just message us.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-cream-dim">
                Reserve online in under a minute and we&rsquo;ll confirm by email.
                If it&rsquo;s easier — or the request is unusual — WhatsApp the house
                and a person will answer.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="/book?type=table"
                  className="group relative overflow-hidden rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink"
                >
                  <span className="relative z-10">Book a table</span>
                  <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                    "Hello Frederick's Kitchen — I'd like to reserve a table.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-7 py-3.5 text-sm text-cream transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp {site.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Private dining */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <span className="eyebrow text-gold/70">Private dining</span>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.5vw,3.25rem)] font-light leading-[1.05] text-cream">
                The long table seats twenty-four.
              </h2>
              <div className="mt-7 space-y-5 leading-relaxed text-cream-dim">
                <p>
                  For a birthday, a wedding lunch, or a team that wants the room to
                  itself — we build the menu with you rather than hand you a package.
                  The chef will tell you honestly what the season can carry and what
                  it can&rsquo;t.
                </p>
                <p>
                  Two weeks&rsquo; notice for the table. Four if you want the whole
                  house.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <InquiryForm
              subject="Private dining"
              heading="Private dining enquiry"
              blurb="Tell us the date, the number of people, and the occasion. We'll reply within 24 hours."
              placeholder="e.g. 18 people, Saturday lunch on the 12th, one no-onion-no-garlic guest and two vegetarians."
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Stay the night, and eat properly twice."
        copy="Dinner, a room upstairs, and the estate breakfast at whatever hour you're leaving."
      />
    </>
  );
}
