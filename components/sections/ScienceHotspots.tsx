"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, X, ArrowRight } from "lucide-react"
import DemoRequestModal from "@/components/forms/DemoRequestModal"

const hotspots = [
  {
    id: 1,
    x: "50%",
    y: "50%",
    title: "Quantum Gate Array",
    desc: "The core logic layer where Hadamard, CNOT, and Pauli gates perform complex probabilistic operations.",
    topic: "Quantum Gates"
  },
  {
    id: 2,
    x: "30%",
    y: "30%",
    title: "Superconducting Interconnects",
    desc: "Zero-resistance paths that maintain state coherence across the entire chip surface.",
    topic: "Superconductivity"
  },
  {
    id: 3,
    x: "70%",
    y: "65%",
    title: "Thermal Isolation Shield",
    desc: "Maintains atomic stability allowing for room-temperature operation through localized photonic cooling.",
    topic: "Thermodynamics"
  },
  {
    id: 4,
    x: "20%",
    y: "60%",
    title: "Neural Synapse Emulator",
    desc: "Quantum-accelerated nodes that mimic biological neural firing patterns for hyper-efficient AI inference.",
    topic: "Bio-Mimicry"
  }
]

export default function ScienceHotspots() {
  const [active, setActive] = useState<typeof hotspots[0] | null>(null)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <section className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-left">
            <h2 className="text-4xl md:text-6xl font-bold font-grotesk text-white mb-8">
              The Science Behind <br />
              <span className="text-gradient-cyan">QuantumAI</span>
            </h2>
            <p className="text-white/40 mb-12 max-w-lg">
              Explore the architectural layers that make room-temperature quantum computing a reality. Click on the hotspots to dive deeper into the physics.
            </p>
            
            <div className="space-y-4">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActive(h)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    active?.id === h.id 
                    ? "bg-primary/10 border-primary/50 text-white" 
                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                  }`}
                >
                  <span className="font-bold">{h.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={() => setIsDemoOpen(true)}
                className="group flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
              >
                Schedule Technical Review <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex-[1.5] relative w-full aspect-square md:aspect-video rounded-[40px] bg-white/[0.02] border border-white/10 overflow-hidden group">
            {/* Mock Chip Diagram */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-2/3 h-2/3 border-2 border-primary/20 rotate-45 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 border-2 border-primary/40 -rotate-12" />
                  <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
               </div>
            </div>

            {hotspots.map((h) => (
              <motion.button
                key={h.id}
                onClick={() => setActive(h)}
                className="absolute w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,240,255,0.5)] z-20 transition-transform hover:scale-125"
                style={{ left: h.x, top: h.y }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: h.id * 0.5 }}
              >
                <Info className="w-5 h-5" />
              </motion.button>
            ))}

            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="absolute bottom-8 left-8 right-8 p-8 rounded-3xl bg-black/80 backdrop-blur-2xl border border-primary/30 z-30"
                >
                  <button 
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 text-white/40 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h4 className="text-xl font-bold text-primary mb-2 font-grotesk">{active.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{active.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <DemoRequestModal isOpen={isDemoOpen} setIsOpen={setIsDemoOpen} />
    </section>
  )
}
