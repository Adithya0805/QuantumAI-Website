"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const cases = [
  {
    title: "Autonomous Systems",
    description: "Real-time perception and decision making at the extreme edge.",
    size: "large",
    gradient: "from-blue-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "LLM Inference",
    description: "Massive scale language models running locally with zero latency.",
    size: "medium",
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    title: "Robotics",
    description: "Coordinating multi-agent systems with millisecond precision.",
    size: "medium",
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    title: "IoT Edge",
    description: "Intelligent sensors that learn.",
    size: "small",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    title: "Medical AI",
    description: "On-site diagnostics and analysis.",
    size: "small",
    gradient: "from-red-500/10 to-transparent",
  },
  {
    title: "Defense & Aerospace",
    description: "Reliable computation in the most demanding environments on Earth and beyond.",
    size: "large",
    gradient: "from-zinc-500/10 to-transparent",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
  },
]

export default function UseCases() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-grotesk tracking-tighter text-white mb-6">
            Universal <span className="text-gradient-cyan">Intelligence</span>
          </h2>
          <p className="text-white/40 max-w-xl font-sans text-lg">
            From deep space to the factory floor, QuantumAI is the infrastructure 
            powering tomorrow&apos;s most ambitious breakthroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[240px]">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative group overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-end",
                item.size === "large" ? "md:col-span-3 md:row-span-2" : 
                item.size === "medium" ? "md:col-span-3 md:row-span-1" : "md:col-span-2 md:row-span-1"
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-500 group-hover:opacity-100", item.gradient)} />
              
              {item.image && (
                <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 font-grotesk">{item.title}</h3>
                <p className="text-white/40 text-sm max-w-[280px] group-hover:text-white/70 transition-colors">
                  {item.description}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20 group-hover:bg-primary transition-colors group-hover:shadow-[0_0_10px_#00F0FF]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
