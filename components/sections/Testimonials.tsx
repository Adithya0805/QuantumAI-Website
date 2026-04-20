"use client"

import React from "react"
import { motion } from "framer-motion"

const testimonials = [
  { quote: "The latency improvements are beyond anything we've measured.", author: "Sarah Chen", role: "CTO @ Robotics-X" },
  { quote: "Deploying LLMs at the edge is finally a reality.", author: "James Miller", role: "Head of AI @ AutoDrive" },
  { quote: "QuantumAI has cut our inference power consumption by 85%.", author: "Dr. Elena Rossi", role: "Dir. Engineering @ SustainSystems" },
  { quote: "The most robust hardware stack in the industry.", author: "Marcus Thorne", role: "Lead Dev @ CyberNexus" },
  { quote: "Scale-out synchronization is flawless.", author: "Yuki Tanaka", role: "Senior Architect @ CloudScale" },
]

export default function Testimonials() {
  return (
    <section className="relative z-10 py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-grotesk tracking-tighter text-white text-center">
          Trusted by the <span className="text-gradient-cyan">Leaders of Tomorrow</span>
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="min-w-[400px] p-8 rounded-2xl glass-morphism border-white/5">
                <p className="text-white/70 text-lg mb-6 italic">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary font-mono">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.author}</div>
                    <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 (Reverse) */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [-1920, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="min-w-[400px] p-8 rounded-2xl glass-morphism border-white/5">
                <p className="text-white/70 text-lg mb-6 italic">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent font-mono">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.author}</div>
                    <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
