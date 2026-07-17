import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import WelcomeIntro from "@/components/home/WelcomeIntro";
import RoomsPreview from "@/components/home/RoomsPreview";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import Pillars from "@/components/home/Pillars";
import Story from "@/components/home/Story";
import ExploreGrid from "@/components/home/ExploreGrid";
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
      <ComeIn>
        <WelcomeIntro />
      </ComeIn>
      <RoomsPreview />
      <MarqueeBanner />
      <Story />
      <ComeIn>
        <Pillars />
      </ComeIn>
      <ExploreGrid />
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
