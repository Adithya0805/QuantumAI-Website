"use client"

import React from "react"
import { motion } from "framer-motion"
import WaitlistForm from "@/components/forms/WaitlistForm"

export default function CTA() {
  return (
    <section className="relative z-10 py-48 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(40px,8vw,120px)] font-bold font-grotesk leading-[0.9] tracking-tighter text-white mb-12"
        >
          The Future is <br />
          <span className="text-gradient-cyan">Quantum</span>
        </motion.h2>

        <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-16">
          Limited devkits available for early access pilots. 
          Join the waitlist to secure your position in the silicon revolution.
        </p>

        <div className="max-w-md mx-auto">
          <WaitlistForm />
        </div>

        <p className="mt-8 text-white/20 text-xs font-mono uppercase tracking-widest">
           NEXT 50 SLOTS OPENING IN OCTOBER 2024
        </p>
      </div>
    </section>
  )
}
