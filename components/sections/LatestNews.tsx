"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

const news = [
  {
    title: "1000 Qubit Milestone Achieved",
    date: "OCT 14, 2024",
    excerpt: "Breakthrough in error correction allows for stable 1000-qubit operations at room temperature.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "CERN Partnership Announced",
    date: "SEP 28, 2024",
    excerpt: "QuantumAI processors to power the next generation of particle collision analysis.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Classical Benchmark Record",
    date: "SEP 12, 2024",
    excerpt: "QuantumAI beats the world's fastest supercomputer by 10,000x in financial modeling.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800"
  }
]

export default function LatestNews() {
  return (
    <section className="py-32 px-6 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold font-grotesk text-white mb-6">
              Latest in <span className="text-gradient-cyan">Quantum</span>
            </h2>
            <p className="text-white/40 max-w-xl">
              Stay updated with the latest breakthroughs in quantum-accelerated artificial intelligence.
            </p>
          </div>
          <button className="px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-2 group">
            View All News <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <span className="text-white font-bold flex items-center gap-2">Read Article <ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-primary mb-4 uppercase tracking-[0.2em]">
                <Calendar className="w-3 h-3" />
                {item.date}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-grotesk group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {item.excerpt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
