"use client"

import { motion } from "framer-motion"
import { Orbit, Zap, Share2, Layers } from "lucide-react"

const concepts = [
  {
    title: "Quantum Superposition",
    icon: Orbit,
    color: "text-blue-400",
    desc: "Unlike classical bits that are 0 or 1, quantum bits (qubits) exist in multiple states simultaneously, enabling exponential processing power for AI workloads."
  },
  {
    title: "Quantum Entanglement",
    icon: Share2,
    color: "text-purple-400",
    desc: "Our processors leverage entangled qubits to perform parallel computations that would take classical computers millennia to solve."
  },
  {
    title: "Quantum Tunneling",
    icon: Zap,
    color: "text-orange-400",
    desc: "Neural networks find optimal solutions faster by exploring solution spaces through quantum tunneling effects."
  },
  {
    title: "Coherence Time",
    icon: Layers,
    color: "text-emerald-400",
    desc: "Industry-leading 500μs coherence time ensures stable, reliable quantum operations at room temperature."
  }
]

export default function WhatIsQuantumAI() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-[0.2em] mb-6"
          >
            The Physics
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-grotesk tracking-tighter text-white"
          >
            Beyond <span className="text-gradient-cyan">Classical</span> Computing
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {concepts.map((concept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/[0.08] transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${concept.color}`}>
                <concept.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-grotesk">{concept.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {concept.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
