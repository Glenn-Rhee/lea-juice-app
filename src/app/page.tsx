import Collection from "@/components/pages/home/Collection";
import HeroPage from "@/components/pages/home/HeroPage";
import StatsSection from "@/components/pages/home/StatsSection";

export default function HomePage() {
  return (
    <>
      <HeroPage />
      <StatsSection />
      <Collection />
    </>
  );
}
