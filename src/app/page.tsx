import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ZoomReveal from "@/components/home/ZoomReveal";
import RoomsPreview from "@/components/home/RoomsPreview";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import Pillars from "@/components/home/Pillars";
import Story from "@/components/home/Story";
import ExpandingGallery from "@/components/home/ExpandingGallery";
import Showcase from "@/components/home/Showcase";
import Testimonials from "@/components/home/Testimonials";
import BrandSeal from "@/components/home/BrandSeal";
import CtaBand from "@/components/CtaBand";
import { ComeIn } from "@/components/motion";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ZoomReveal />
      <ComeIn>
        <RoomsPreview />
      </ComeIn>
      <MarqueeBanner />
      <Story />
      <ComeIn>
        <Pillars />
      </ComeIn>
      <ExpandingGallery />
      <Showcase />
      <ComeIn>
        <Testimonials />
      </ComeIn>
      <ComeIn>
        <BrandSeal />
      </ComeIn>
      <ComeIn>
        <CtaBand />
      </ComeIn>
    </>
  );
}
