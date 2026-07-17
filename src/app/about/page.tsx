import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import InquiryForm from "@/components/InquiryForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/BrandIcons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "The story of Frederick's Kitchen — a working coffee estate in Chikmagaluru turned four-room stay and Malnad kitchen. Find us, call us, or send an enquiry.",
  alternates: { canonical: "/about" },
};

const chapters = [
  {
    year: "1952",
    title: "Frederick plants the first rows.",
    copy: "Thirty-two acres on the slope below Baba Budangiri, cleared by hand and planted to Arabica. The house went up the same year, with a kitchen far larger than one family could need — which turned out to be the point.",
  },
  {
    year: "1978",
    title: "The kitchen starts feeding the hill.",
    copy: "Pickers, planters, and anyone who walked up at the right hour. No menu, no prices — whatever the garden had that morning. Most of what we cook now was worked out at that table.",
  },
  {
    year: "2019",
    title: "Four rooms open.",
    copy: "The planter's wing restored rather than gutted — same teak, same shutters, better plumbing. Four rooms, because it's the most we can look after without it becoming a hotel.",
  },
  {
    year: "Today",
    title: "Still a working estate.",
    copy: "The coffee is still picked, pulped, and dried here. The kitchen still cooks what the garden gives it. The only real change is that now you can book a bed instead of hoping for one.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A kitchen that outgrew the family it was built for."
        copy="Three generations on the same slope, cooking the same food for whoever climbs the hill. The rooms came last, and almost by accident."
        image="/images/restaurant-lounge.jpg"
        tone="from-[#312819] via-[#1b1610] to-[#0e0d0b]"
      />

      {/* Story */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <Reveal>
            <Frame
              tone="from-[#4a3a24] via-[#2a2013] to-[#12100a]"
              src="/images/restaurant-hall.jpg"
              alt="Frederick's Kitchen, the garden dining hall"
              className="h-[400px] rounded-2xl lg:sticky lg:top-28 lg:h-[560px]"
            />
          </Reveal>

          <Stagger className="space-y-0">
            {chapters.map((c) => (
              <StaggerItem key={c.year}>
                <div className="grid gap-2 border-b border-cream/10 py-9 sm:grid-cols-[7rem_1fr] sm:gap-8">
                  <p className="font-display text-3xl text-gold">{c.year}</p>
                  <div>
                    <h2 className="font-display text-2xl leading-snug text-cream">
                      {c.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                      {c.copy}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-28 border-t border-cream/10 bg-ink-soft">
        <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-16">
          <Reveal>
            <span className="eyebrow text-gold/70">Contact</span>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] text-cream">
              Call the house. A person answers.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div>
              <Stagger className="space-y-7">
                <StaggerItem>
                  <ContactRow icon={<MapPin size={18} />} label="Find us">
                    <p className="text-cream">{site.address}</p>
                    <a
                      href="https://maps.google.com/?q=Chikmagaluru,Karnataka"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm text-gold underline-offset-4 hover:underline"
                    >
                      Open in Google Maps &rarr;
                    </a>
                  </ContactRow>
                </StaggerItem>

                <StaggerItem>
                  <ContactRow icon={<Phone size={18} />} label="Call or WhatsApp">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="text-cream transition-colors hover:text-gold"
                    >
                      {site.phone}
                    </a>
                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <WhatsAppIcon size={14} /> Message us
                    </a>
                  </ContactRow>
                </StaggerItem>

                <StaggerItem>
                  <ContactRow icon={<Mail size={18} />} label="Email">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-cream transition-colors hover:text-gold"
                    >
                      {site.email}
                    </a>
                    <p className="mt-2 text-sm text-cream-dim">
                      {site.responseAssurance}
                    </p>
                  </ContactRow>
                </StaggerItem>

                <StaggerItem>
                  <ContactRow icon={<Clock size={18} />} label="Kitchen hours">
                    <dl className="space-y-1.5 text-sm">
                      {[
                        ["Breakfast", "7:30 – 11:00"],
                        ["Lunch", "12:30 – 15:00"],
                        ["Dinner", "19:30 – 22:30"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex gap-4">
                          <dt className="w-24 text-cream-dim">{k}</dt>
                          <dd className="text-cream">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-3 text-sm text-cream-dim">
                      Riding out early? Tell us the night before and breakfast is at six.
                    </p>
                  </ContactRow>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex gap-3 pt-2">
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="rounded-full border border-cream/15 p-3 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <InstagramIcon size={17} />
                    </a>
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="rounded-full border border-cream/15 p-3 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <FacebookIcon size={17} />
                    </a>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>

            <Reveal delay={0.1}>
              <InquiryForm
                subject="General enquiry"
                heading="Send a message"
                blurb="Anything at all — a question about the rooms, a dietary requirement, or directions for the last nine kilometres."
              />
            </Reveal>
          </div>

          {/* Map */}
          <Reveal>
            <div className="mt-16 overflow-hidden rounded-2xl border border-cream/10">
              <iframe
                src={site.mapEmbed}
                title="Frederick's Kitchen on the map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[380px] w-full grayscale-[35%] contrast-110"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <span className="mt-0.5 shrink-0 text-gold/60">{icon}</span>
      <div>
        <p className="eyebrow mb-2.5 text-cream-dim/50">{label}</p>
        {children}
      </div>
    </div>
  );
}
