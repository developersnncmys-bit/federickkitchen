import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Pillars from "@/components/home/Pillars";
import Story from "@/components/home/Story";
import ScrollGallery from "@/components/home/ScrollGallery";
import Showcase from "@/components/home/Showcase";
import Testimonials from "@/components/home/Testimonials";
import BrandSeal from "@/components/home/BrandSeal";
import CtaBand from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Pillars />
      <Story />
      <ScrollGallery />
      <Showcase />
      <Testimonials />
      <BrandSeal />
      <CtaBand />
    </>
  );
}
