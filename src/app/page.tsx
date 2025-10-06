import Collection from "@/components/pages/home/Collection";
import CTA from "@/components/pages/home/CTA";
import HeroPage from "@/components/pages/home/HeroPage";
import StatsSection from "@/components/pages/home/StatsSection";
import Story from "@/components/pages/home/Story";
import Testimonials from "@/components/pages/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <HeroPage />
      <StatsSection />
      <Collection />
      <Story />
      <Testimonials />
      <CTA />
    </>
  );
}
