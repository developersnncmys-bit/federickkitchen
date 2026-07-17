import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Reveal } from "@/components/motion";
import { InstagramIcon, FacebookIcon } from "@/components/BrandIcons";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-cream/10 bg-ink-soft">
      <div className="absolute -bottom-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-16">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt={site.name}
                className="mb-8 h-20 w-auto md:h-24"
              />
              <p className="font-display text-4xl leading-[1.1] text-cream md:text-5xl">
                Come up the hill.
              </p>
              <p className="mt-5 max-w-md text-cream-dim">
                {site.tagline} {site.responseAssurance}
              </p>
              <Link
                href="/book"
                className="group mt-8 inline-flex items-center gap-3 text-gold"
              >
                <span className="border-b border-gold/40 pb-1 transition-colors group-hover:border-gold">
                  Book a room or a table
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>

            <div>
              <h3 className="eyebrow text-gold/70">Explore</h3>
              <ul className="mt-6 space-y-3">
                {[...nav, { label: "Book", href: "/book" }].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-cream-dim transition-colors hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow text-gold/70">Find us</h3>
              <ul className="mt-6 space-y-4 text-cream-dim">
                <li className="flex gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-gold/60" />
                  <span>{site.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0 text-gold/60" />
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-cream"
                  >
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-gold/60" />
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-cream"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>

              <div className="mt-7 flex gap-3">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="rounded-full border border-cream/15 p-2.5 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <InstagramIcon size={16} />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="rounded-full border border-cream/15 p-2.5 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <FacebookIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-3 border-t border-cream/10 pt-8 text-xs text-cream-dim/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Crafted by{" "}
            <span className="text-cream-dim">Nakshatra Namaha Creations</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
