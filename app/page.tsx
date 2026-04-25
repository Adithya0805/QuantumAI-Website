import Hero from "@/components/sections/Hero";
import WhatIsQuantumAI from "@/components/sections/WhatIsQuantumAI";
import { LazySection } from "@/components/LazySection";
import { 
  QuantumCore, 
  SearchSupremacy, 
  CryptoTerminal, 
  Architecture, 
  Demo 
} from "@/lib/dynamicImports";
import QuantumReadinessQuiz from "@/components/sections/QuantumReadinessQuiz";
import Newsletter from "@/components/sections/Newsletter";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/ui/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import BackToTop from "@/components/ui/BackToTop";

export const metadata = {
  title: 'QuantumAI | Next-Gen AI Hardware',
  description: 'Experience the power of edge quantum computing first-hand.',
  openGraph: {
    title: 'QuantumAI',
    description: 'Experience the power of edge quantum computing first-hand.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Hero />
      
      {/* Deep-Tech Core Features */}
      <WhatIsQuantumAI />
      
      <LazySection>
        <div id="quantum-core"><QuantumCore /></div>
      </LazySection>
      
      <LazySection>
        <div id="search-supremacy"><SearchSupremacy /></div>
      </LazySection>
      
      <LazySection>
        <div id="security"><CryptoTerminal /></div>
      </LazySection>
      
      <LazySection>
        <Architecture />
      </LazySection>
      
      {/* Conversion / Action */}
      <LazySection>
        <div id="readiness-quiz"><QuantumReadinessQuiz /></div>
      </LazySection>
      
      <LazySection>
        <Demo />
      </LazySection>
      
      <Newsletter />
      <CTA />
      
      <Footer />
      
      {/* Global Overlays */}
      <CookieConsent />
      <BackToTop />
    </main>
  );
}
