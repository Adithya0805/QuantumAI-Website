"use client"

import React from "react"
import { motion } from "framer-motion"
import { Play, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the heavy 3D scene to prevent hydration bugs and speed up initial page load
const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#020205]">
      <div className="w-16 h-16 rounded-full border-t-2 border-primary animate-spin shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
    </div>
  )
})
import GlowButton from "@/components/ui/GlowButton"
import VideoModal from "@/components/ui/VideoModal"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog"
import WaitlistForm from "@/components/forms/WaitlistForm";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] font-bold">
            COSMIC EXPLORER
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(40px,10vw,140px)] leading-[0.85] font-bold font-grotesk tracking-tighter text-white mb-8"
        >
          EXPLORE <br />
          <span className="text-gradient-cyan">THE COSMOS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-white/40 text-lg md:text-xl font-sans mb-12"
        >
          A revolutionary AI portfolio navigating through the frontiers of the digital galaxy and beyond.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Dialog>
             <DialogTrigger asChild>
               <GlowButton variant="primary">
                 Get Started <ArrowRight className="w-5 h-5 ml-1" />
               </GlowButton>
             </DialogTrigger>
             <DialogContent className="max-w-xl p-0 bg-transparent border-none">
                <WaitlistForm />
             </DialogContent>
          </Dialog>

          <button 
            onClick={() => setIsVideoOpen(true)}
            className="flex items-center gap-3 text-white font-bold hover:text-primary transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <Play className="fill-white group-hover:fill-primary ml-1" size={20} />
            </div>
            Watch Demo
          </button>
        </motion.div>
      </div>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20 animate-bounce cursor-pointer">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-t from-primary/50 to-transparent" />
      </div>
      
      {/* HUD elements */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:flex flex-col items-end gap-8">
         <div className="text-right">
            <div className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] mb-1">Coherence</div>
            <div className="text-2xl font-bold text-white font-grotesk">504.2μs</div>
         </div>
         <div className="text-right">
            <div className="text-[10px] font-mono text-orange-400 uppercase tracking-[0.2em] mb-1">Temperature</div>
            <div className="text-2xl font-bold text-white font-grotesk">298.15K</div>
         </div>
      </div>
    </section>
  )
}
