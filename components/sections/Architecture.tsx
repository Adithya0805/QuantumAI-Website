"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "@/lib/gsap"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import AIChip from "@/components/3d/AIChip"
import { motion } from "framer-motion"

const ARCH_LAYERS = [
  { 
    title: "Silicon Lattice", 
    sub: "7nm Quantum Mesh", 
    desc: "Atomic precision interconnects for zero bottleneck data transfer. Using advanced photonic lithography to reach near-zero resistivity." 
  },
  { 
    title: "Neural Core", 
    sub: "10,000 Tensor Engines", 
    desc: "Massively parallel processing designed for non-linear computation. Each core capable of 1.2 Petoflops of neural inference." 
  },
  { 
    title: "Quantum Buffer", 
    sub: "Photonic HBM", 
    desc: "Light-speed memory access with near-infinite bandwidth throughput. Synchronized at the sub-nanosecond level." 
  },
  { 
    title: "Synaptic Link", 
    sub: "Bio-organic Interface", 
    desc: "Seamless neural-quantum bridging for intuitive computational command. Bridging the gap between carbon and silicon." 
  },
]

export default function Architecture() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeLayer, setActiveLayer] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin = pinRef.current
      if (!pin) return

      // Main pin animation with a single timeline for all transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress)
            const index = Math.min(Math.floor(self.progress * ARCH_LAYERS.length), ARCH_LAYERS.length - 1)
            setActiveLayer(index)
          }
        }
      })

      // Animate the cards in a sequence within the timeline
      const cards = gsap.utils.toArray(".arch-card") as HTMLElement[]
      
      cards.forEach((card, i) => {
        // Fade in
        tl.fromTo(card, 
          { opacity: 0, scale: 0.8, y: 100, filter: "blur(10px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1 },
          i // Sequence start
        )

        // Hold stay if not the last one, then fade out
        if (i < cards.length - 1) {
            tl.to(card, 
              { opacity: 0, scale: 1.1, y: -50, filter: "blur(10px)", duration: 1 },
              i + 0.8 // Start fading out slightly before next one comes in for overlap
            )
        }
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative z-20 bg-[#020205]">
      <div ref={pinRef} className="h-screen flex items-center justify-center overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50" />

        {/* Background 3D Chip - now larger and more dramatic */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
              <AIChip scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Sticky Progress Indicator */}
        <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-10 z-30">
          {ARCH_LAYERS.map((_, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-pointer">
              <div className="relative">
                 <div className={`w-0.5 transition-all duration-700 ${activeLayer === i ? 'h-16 bg-primary' : 'h-4 bg-white/10'}`} />
                 {activeLayer === i && (
                    <motion.div 
                        layoutId="indicator-glow"
                        className="absolute inset-0 w-0.5 h-full bg-primary blur-md"
                    />
                 )}
              </div>
              <div className="space-y-1">
                <span className={`text-[10px] font-mono block transition-colors duration-500 uppercase tracking-[0.3em] ${activeLayer === i ? 'text-primary' : 'text-white/10'}`}>
                    Layer
                </span>
                <span className={`text-xl font-bold font-grotesk block transition-colors duration-500 ${activeLayer === i ? 'text-white' : 'text-white/10'}`}>
                    0{i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Centralized Breakthrough Layers Stack */}
        <div className="relative z-20 w-full max-w-2xl px-6 flex items-center justify-center h-full">
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                {ARCH_LAYERS.map((layer, i) => (
                <div 
                    key={i} 
                    className="arch-card absolute inset-0 glass p-10 md:p-14 rounded-[3rem] border border-white/5 flex flex-col justify-center backdrop-blur-3xl"
                    style={{ opacity: 0 }} // Managed by GSAP
                >
                    {/* Decorative cyber elements */}
                    <div className="absolute top-8 right-8 text-primary/20 font-mono text-4xl font-black">0{i+1}</div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
                    
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00f0ff]" />
                                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] font-bold">X-Quantum Integrated</span>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black text-white font-grotesk tracking-tighter uppercase italic leading-[0.9]">
                                {layer.title.split(' ')[0]} <br/>
                                <span className="text-gradient-cyan">{layer.title.split(' ')[1]}</span>
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-8 bg-white/20" />
                                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{layer.sub}</span>
                            </div>
                            <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium max-w-lg">
                                {layer.desc}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                                Latency: 0.001ms
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                                Bandwidth: 1.2TB/s
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* Floating Section Title */}
        <div className="absolute top-10 right-10 text-right">
            <h2 className="text-lg md:text-2xl font-black font-grotesk tracking-tight text-white/20 uppercase italic">
                Inside the <span className="text-white/40">Architecture</span>
            </h2>
        </div>

      </div>
    </div>
  )
}
