"use client"

import React, { useEffect, useRef } from "react"
import gsap from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Architecture() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const chipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin = pinRef.current
      if (!pin) return

      gsap.to(chipRef.current, {
        scale: 5,
        rotate: 45,
        opacity: 0,
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      })

      // Layer animations
      const layers = document.querySelectorAll(".arch-layer")
      layers.forEach((layer, i) => {
        gsap.from(layer, {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: pin,
            start: `${i * 33}% top`,
            end: `${(i + 1) * 33}% top`,
            scrub: 1,
          }
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative z-10">
      <div ref={pinRef} className="h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Macro View Chip Simulation */}
        <div ref={chipRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-primary/20 rounded-3xl border border-primary/40 blur-[2px]" />
        </div>

        {/* Breakdown Layers */}
        <div className="relative z-20 max-w-5xl w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Silicion Lattice", sub: "7nm Quantum Mesh", desc: "Atomic precision interconnects for zero bottleneck data transfer." },
              { title: "Neural Core", sub: "10,000 Tensor Engines", desc: "Massively parallel processing designed for non-linear computation." },
              { title: "Quantum Buffer", sub: "Photonic HBM", desc: "Light-speed memory access with near-infinite bandwidth throughput." },
            ].map((layer, i) => (
              <div key={i} className="arch-layer bg-white/5 backdrop-blur-3xl p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors">
                <div className="text-[10px] font-mono text-primary mb-4 tracking-[0.2em] uppercase">Layer 0{i+1}</div>
                <h3 className="text-2xl font-bold text-white mb-2 font-grotesk">{layer.title}</h3>
                <div className="text-xs font-mono text-white/40 mb-6 uppercase tracking-wider">{layer.sub}</div>
                <p className="text-white/50 text-sm leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-grotesk tracking-tighter text-white">
                Inside the <span className="text-gradient-cyan">Architecture</span>
            </h2>
        </div>
      </div>
    </div>
  )
}
