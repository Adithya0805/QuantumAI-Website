"use client"

import { motion } from "framer-motion"
import { Beaker, TrendingUp, Cloud, Lock, MapPin, Brain } from "lucide-react"

const useCases = [
  {
    title: "Drug Discovery",
    icon: Beaker,
    desc: "Simulate molecular interactions at quantum level, reducing drug discovery time from 10 years to 10 months.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Financial Modeling",
    icon: TrendingUp,
    desc: "Portfolio optimization across millions of variables with quantum Monte Carlo methods for real-time risk assessment.",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Climate Simulation",
    icon: Cloud,
    desc: "Model complex climate systems with unprecedented accuracy using quantum fluid dynamics and thermal modeling.",
    color: "from-sky-500/20 to-blue-500/20"
  },
  {
    title: "Cryptography",
    icon: Lock,
    desc: "Post-quantum encryption that's unbreakable even by future quantum computers, securing global communications.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Logistics Optimization",
    icon: MapPin,
    desc: "Solve traveling salesman problems with 10,000+ nodes in seconds, reducing global logistics emissions by 40%.",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Generative AI",
    icon: Brain,
    desc: "Train LLMs 1000x faster with quantum-accelerated gradient descent and advanced attention mechanisms.",
    color: "from-indigo-500/20 to-purple-500/20"
  }
]

export default function RealWorldApplications() {
  return (
    <section className="py-32 px-6 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold font-grotesk tracking-tighter text-white">
            Real-World <span className="text-gradient-purple">Impact</span>
          </h2>
          <p className="mt-6 text-white/40 text-lg max-w-2xl mx-auto">
            Where theoretical physics meets industrial-scale problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-10 rounded-[40px] bg-gradient-to-br ${useCase.color} border border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl z-0" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                   <useCase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 font-grotesk">{useCase.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {useCase.desc}
                </p>
                
                <button className="mt-12 flex items-center gap-2 text-white font-bold group/btn">
                  Learn More <span className="text-primary group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
