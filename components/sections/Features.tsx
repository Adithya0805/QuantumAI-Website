"use client"

import React, { useState } from "react"
import { Zap, Shield, Cpu, Activity, Code, Layers, ArrowRight, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"
import GlassCard from "@/components/ui/GlassCard"
import DemoRequestModal from "@/components/forms/DemoRequestModal"

const features = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Neural Acceleration",
    description: "Dedicated ASIC architectures optimized for transformer-based models and LLMs.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Learning",
    description: "On-chip training capabilities for adaptive AI that evolves with your data stream.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Quantum Encryption",
    description: "End-to-end hardware-level security with post-quantum cryptographic primitives.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Infinite Scale",
    description: "Modular architecture allowing for seamless multi-chip interconnect synchronization.",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Zero-latency API",
    description: "Ultra-low overhead software stack with direct-to-silicon execution paths.",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Edge Deployment",
    description: "Power-efficient processing for autonomous robotics and remote sensing.",
  },
]

export default function Features() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold font-grotesk tracking-tighter text-white mb-6">
            Engineered for the <span className="text-gradient-cyan">Impossible</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto font-mono text-sm uppercase tracking-widest">
            ◆ Next-generation capabilities for complex computation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <GlassCard key={i} delay={i * 0.1}>
              <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit text-primary group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-grotesk">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                Explore Tech <Zap className="w-3 h-3" />
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="mt-20 text-center">
          <button
            onClick={() => setIsDemoOpen(true)}
            className="group relative px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold overflow-hidden transition-all hover:border-primary/50"
          >
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative flex items-center gap-2">
              Schedule Detailed Technical Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      <DemoRequestModal isOpen={isDemoOpen} setIsOpen={setIsDemoOpen} />
    </section>
  )
}
