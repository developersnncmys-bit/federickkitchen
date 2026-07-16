import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The restaurant, the rooms, the estate, and Chikmagaluru itself — photographs from Frederick's Kitchen in the Western Ghats.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The house, the hill, and what comes out of the kitchen."
        copy="Photographs from the estate — the long table, the rooms, the drying beds, and the ridge at the hour worth waking for."
        image="/images/restaurant-garden.jpg"
        tone="from-[#2c2418] via-[#191510] to-[#0e0d0b]"
      />

      <GalleryGrid />

      <CtaBand
        title="It's better in person."
        copy="Photographs don't carry the smell of the drying beds at noon, or how quiet it gets after the last table clears."
      />
    </>
  );
}
