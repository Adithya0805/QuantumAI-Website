import Hero from "@/components/sections/Hero";
import WhatIsQuantumAI from "@/components/sections/WhatIsQuantumAI";
import QuantumCore from "@/components/sections/QuantumCore";
import SearchSupremacy from "@/components/sections/SearchSupremacy";
import CryptoTerminal from "@/components/sections/CryptoTerminal";
import QuantumReadinessQuiz from "@/components/sections/QuantumReadinessQuiz";
import Architecture from "@/components/sections/Architecture";
import Demo from "@/components/sections/Demo";
import Newsletter from "@/components/sections/Newsletter";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/ui/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Hero />
      
      {/* Deep-Tech Core Features */}
      <WhatIsQuantumAI />
      <div id="quantum-core"><QuantumCore /></div>
      <div id="search-supremacy"><SearchSupremacy /></div>
      <div id="security"><CryptoTerminal /></div>
      
      <Architecture />
      
      {/* Conversion / Action */}
      <div id="readiness-quiz"><QuantumReadinessQuiz /></div>
      <Demo />
      <Newsletter />
      <CTA />
      
      <Footer />
      
      {/* Global Overlays */}
      <CookieConsent />
      <BackToTop />
    </main>
  );
}
