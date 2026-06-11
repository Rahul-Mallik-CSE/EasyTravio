
import HomeHeroSection from "@/components/HomeComponents/HomeHeroSection";
import InspirationSection from "@/components/HomeComponents/InspirationSection";
import PastOffersSection from "@/components/HomeComponents/PastOffersSection";
import SpecialOfferSection from "@/components/HomeComponents/SpecialOfferSection";
import TrendingSection from "@/components/HomeComponents/TrendingSection";


export default function Home() {
  return (
    <div className="w-full min-h-screen bg-transparent">
        <HomeHeroSection />

        <SpecialOfferSection />

        <TrendingSection />

        <PastOffersSection />

        <InspirationSection />
      
    </div>
  );
}
