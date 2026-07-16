import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RoomList from "@/components/rooms/RoomList";
import CtaBand from "@/components/CtaBand";
import { site, rooms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Premium Rooms — Coffee Estate Stay",
  description:
    "Four premium rooms on a working coffee estate in Chikmagaluru: valley-facing suites, a heritage planter's room, and a rider's room with covered secure parking. Book direct.",
  alternates: { canonical: "/rooms" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: site.name,
  url: `${site.url}/rooms`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chikmagaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  makesOffer: rooms.map((r) => ({
    "@type": "Offer",
    name: r.name,
    description: r.blurb,
    price: r.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  })),
};

export default function RoomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="The stay"
        title="Four rooms. That's the most we can look after properly."
        copy="Every room looks onto the estate or the garden, every room has the coffee that grows below it, and every room is ten minutes' walk from a ridge worth waking up for. Check-in 13:00, check-out 11:00 — and if you're riding, we'll flex both."
        image="/images/room-deluxe.jpg"
        tone="from-[#33281a] via-[#1b1610] to-[#0e0d0b]"
      />

      <RoomList />

      <CtaBand
        title="Four rooms, nine beds. Take all of them."
        copy="Full-property buyouts for offsites and celebrations — exclusive use of the rooms, the lawn, and the estate."
      />
    </>
  );
}
