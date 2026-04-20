"use client"

import { motion } from "framer-motion"
import { Orbit, Cpu } from "lucide-react"

const metrics = [
  { label: "Training Speed", classical: 100, quantum: 0.1, cLabel: "100 hours", qLabel: "6 minutes", unit: "hrs" },
  { label: "Energy Usage", classical: 100, quantum: 1, cLabel: "10,000 kWh", qLabel: "100 kWh", unit: "kwh" },
  { label: "Parameter Capacity", classical: 10, quantum: 100, cLabel: "1T params", qLabel: "1Q params", unit: "val" },
  { label: "Inference Latency", classical: 100, quantum: 0.1, cLabel: "100ms", qLabel: "0.1ms", unit: "ms" },
]

export default function Comparison() {
  return (
    <section className="py-32 px-6 bg-[#0A0A0F]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-grotesk text-white mb-6">
            The <span className="text-gradient-orange">Advantage</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            QuantumAI outperforms classical silicon by multiple orders of magnitude across every critical AI metric.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl">
          <div className="grid grid-cols-3 mb-12 border-b border-white/10 pb-6 text-sm font-mono uppercase tracking-[0.2em]">
            <div className="text-white/40">Metric</div>
            <div className="text-center flex items-center justify-center gap-2 text-white/40">
              <Cpu className="w-4 h-4" /> Classical
            </div>
            <div className="text-center flex items-center justify-center gap-2 text-primary">
              <Orbit className="w-4 h-4" /> QuantumAI
            </div>
          </div>

          <div className="space-y-12">
            {metrics.map((m, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 group">
                <div className="text-xl font-bold text-white/80 group-hover:text-white transition-colors">
                  {m.label}
                </div>
                
                <div className="relative h-12 bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <div className="absolute inset-y-0 left-0 bg-white/10 w-full" />
                   <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/40 uppercase">
                     {m.cLabel}
                   </div>
                </div>

                <div className="relative h-12 bg-primary/10 rounded-full overflow-hidden border border-primary/20 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut", delay: i * 0.1 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/40 to-primary" 
                   />
                   <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-black font-bold uppercase">
                     {m.qLabel}
                   </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Encryption Benchmark</h4>
              <p className="text-white/40 text-sm">Post-quantum cryptography protects data against future threats.</p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 rounded-full bg-white/10 border border-white/10 text-white/40 text-xs font-mono uppercase">RSA-2048</div>
              <div className="px-6 py-3 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-mono uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)]">P-Quantum</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
