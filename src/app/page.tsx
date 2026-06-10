
import HomeHeroSection from "@/components/HomeComponents/HomeHeroSection";
import InspirationSection from "@/components/HomeComponents/InspirationSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-transparent">
        <HomeHeroSection />

        <InspirationSection />
      
    </div>
  );
}
