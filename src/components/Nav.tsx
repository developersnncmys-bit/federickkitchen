"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { clsx } from "@/lib/clsx";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // The homepage hero is a dark photograph, so the nav rides light over it until
  // you scroll; every other page opens on a light hero, so it stays dark there.
  const isHome = pathname === "/";
  const light = !scrolled && isHome;

  // Close the drawer on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-cream/10 bg-ink/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6",
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3 leading-none"
            aria-label={`${site.name} — home`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt=""
              aria-hidden="true"
              className={clsx(
                "w-auto shrink-0 transition-all duration-500",
                scrolled ? "h-9 md:h-10" : "h-11 md:h-12",
              )}
            />
            <span className="flex flex-col">
              <span
                className={clsx(
                  "font-display text-xl tracking-tight transition-colors md:text-2xl",
                  light ? "text-white" : "text-cream",
                )}
              >
                Frederick&rsquo;s
              </span>
              <span
                className={clsx(
                  "eyebrow mt-1 transition-colors",
                  light
                    ? "text-white/70 group-hover:text-white"
                    : "text-gold/70 group-hover:text-gold",
                )}
              >
                Kitchen · Chikmagaluru
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative py-1 text-sm transition-colors",
                    light
                      ? active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : active
                        ? "text-cream"
                        : "text-cream/60 hover:text-cream",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/book"
              className={clsx(
                "group relative overflow-hidden rounded-full border px-6 py-2.5 text-sm transition-colors hover:text-white",
                light ? "border-white/50 text-white" : "border-gold/50 text-gold",
              )}
            >
              <span className="relative z-10">Book</span>
              <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={clsx("p-2 lg:hidden", light ? "text-white" : "text-cream")}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ink lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="" aria-hidden="true" className="h-10 w-auto" />
                <span className="font-display text-xl">Frederick&rsquo;s</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-cream"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="mt-10 flex flex-col gap-2 px-6"
            >
              {[...nav, { label: "Book a Room or Table", href: "/book" }].map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="border-b border-cream/10"
                >
                  <Link
                    href={item.href}
                    className="block py-5 font-display text-4xl text-cream"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <div className="absolute bottom-10 left-6 right-6 text-sm text-cream-dim">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block text-gold">
                {site.phone}
              </a>
              <p className="mt-2">{site.address}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
