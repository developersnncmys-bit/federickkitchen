import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ZoomReveal from "@/components/home/ZoomReveal";
import RoomsPreview from "@/components/home/RoomsPreview";
import Pillars from "@/components/home/Pillars";
import Story from "@/components/home/Story";
import ExpandingGallery from "@/components/home/ExpandingGallery";
import Showcase from "@/components/home/Showcase";
import Testimonials from "@/components/home/Testimonials";
import BrandSeal from "@/components/home/BrandSeal";
import CtaBand from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ZoomReveal />
      <RoomsPreview />
      <Story />
      <Pillars />
      <ExpandingGallery />
      <Showcase />
      <Testimonials />
      <BrandSeal />
      <CtaBand />
    </>
  );
}
