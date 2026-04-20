import Hero from "@/components/sections/Hero";
import WhatIsQuantumAI from "@/components/sections/WhatIsQuantumAI";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import ScienceHotspots from "@/components/sections/ScienceHotspots";
import Comparison from "@/components/sections/Comparison";
import Architecture from "@/components/sections/Architecture";
import RealWorldApplications from "@/components/sections/RealWorldApplications";
import Demo from "@/components/sections/Demo";
import LatestNews from "@/components/sections/LatestNews";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/ui/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Hero />
      <WhatIsQuantumAI />
      <Stats />
      <div id="features"><Features /></div>
      <div id="science"><ScienceHotspots /></div>
      <div id="comparison"><Comparison /></div>
      <Architecture />
      <div id="applications"><RealWorldApplications /></div>
      <Demo />
      <LatestNews />
      <Testimonials />
      <div id="pricing"><Pricing /></div>
      <div id="faq"><FAQ /></div>
      <CTA />
      <Footer />
      
      {/* Global Overlays */}
      <CookieConsent />
      <BackToTop />
    </main>
  );
}
