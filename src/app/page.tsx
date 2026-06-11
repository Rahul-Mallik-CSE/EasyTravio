
import HomeHeroSection from "@/components/HomeComponents/HomeHeroSection";
import InspirationSection from "@/components/HomeComponents/InspirationSection";
import SpecialOfferSection from "@/components/HomeComponents/SpecialOfferSection";
import TrendingSection from "@/components/HomeComponents/TrendingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-transparent">
        <HomeHeroSection />

        <SpecialOfferSection />

        <TrendingSection />

        <InspirationSection />
      
    </div>
  );
}
