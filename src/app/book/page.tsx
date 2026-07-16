import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BookingEngine from "@/components/book/BookingEngine";

export const metadata: Metadata = {
  title: "Book a Room or a Table",
  description:
    "Book direct with Frederick's Kitchen, Chikmagaluru — check room availability for your dates or reserve a table. No payment online; we confirm within 24 hours.",
  alternates: { canonical: "/book" },
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book direct"
        title="Tell us when, and we'll do the rest."
        copy="Nothing to pay online. Send the request and a person from the house confirms by phone or email — normally the same day, always within 24 hours."
        image="/images/exterior-tower.jpg"
        tone="from-[#2a2114] via-[#191510] to-[#0e0d0b]"
      />

      <Suspense fallback={<EngineFallback />}>
        <BookingEngine />
      </Suspense>
    </>
  );
}

function EngineFallback() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
      <div className="mx-auto h-16 w-full max-w-md animate-pulse rounded-full bg-ink-soft" />
      <div className="mt-12 h-96 animate-pulse rounded-2xl bg-ink-soft" />
    </div>
  );
}
