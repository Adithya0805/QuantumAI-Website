"use client"

import React, { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { Search, Database, Zap, Binary, Sigma } from "lucide-react"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls } from "@react-three/drei"

// Dynamically import the 3D visualizer
const SearchVisualizer3D = dynamic(() => import("@/components/3d/SearchVisualizer3D"), { 
  ssr: false,
  loading: () => null
})

type SearchStatus = "idle" | "classical" | "quantum" | "found"

export default function SearchSupremacy() {
  const [classicalStatus, setClassicalStatus] = useState<SearchStatus>("idle")
  const [quantumStatus, setQuantumStatus] = useState<SearchStatus>("idle")
  const [targetIndex, setTargetIndex] = useState(0)
  
  const gridSize = 16
  const totalItems = gridSize * gridSize
  
  const [classicalTime, setClassicalTime] = useState(0)
  const [quantumTime, setQuantumTime] = useState(0)
  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (classicalStatus === "classical" || quantumStatus === "quantum") {
      interval = setInterval(() => {
        if (classicalStatus === "classical") setClassicalTime(t => t + 10)
        if (quantumStatus === "quantum") setQuantumTime(t => t + 10)
      }, 10)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [classicalStatus, quantumStatus])

  const startRace = () => {
    // Pick a random target in the latter half of the grid so classical search takes longer
    const newTarget = Math.floor(Math.random() * (totalItems / 2)) + (totalItems / 2)
    setTargetIndex(newTarget)
    
    setClassicalTime(0)
    setQuantumTime(0)
    
    setClassicalStatus("classical")
    setQuantumStatus("quantum")
  }

  const resetRace = () => {
    setClassicalStatus("idle")
    setQuantumStatus("idle")
    setClassicalTime(0)
    setQuantumTime(0)
  }

  return (
    <section className="relative py-32 px-6 bg-[#05050A] border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-mono uppercase tracking-[0.2em] mb-6"
          >
            Search Supremacy
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-grotesk tracking-tighter text-white mb-6"
          >
            Grover&apos;s <span className="text-gradient-cyan">Algorithm</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            A visual proof of quantum exponential speedup. While classical computers must check items one-by-one <span className="font-mono text-red-400 text-sm bg-red-400/10 px-1 rounded">O(N)</span>, Quantum AI uses probability amplitude amplification to search all items simultaneously <span className="font-mono text-cyan-400 text-sm bg-cyan-400/10 px-1 rounded">O(√N)</span>.
          </motion.p>
        </div>

        {/* 3D Visualizer Container */}
        <div className="w-full h-[50vh] min-h-[400px] rounded-3xl border border-white/10 bg-black/50 overflow-hidden relative mb-12">
          
          {/* Canvas */}
          <Canvas>
            <Suspense fallback={null}>
              {/* Adjust camera for the side-by-side view */}
              <PerspectiveCamera makeDefault position={[0, 15, 20]} fov={45} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} />
              
              <ambientLight intensity={0.2} />
              <pointLight position={[0, 20, 0]} intensity={1} color="#ffffff" />
              
              {/* Classical Grid (Left) */}
              <SearchVisualizer3D 
                status={classicalStatus} 
                targetIndex={targetIndex} 
                gridSize={gridSize} 
                position={[-12, 0, 0]}
                onFound={() => setClassicalStatus("found")}
              />
              
              {/* Quantum Grid (Right) */}
              <SearchVisualizer3D 
                status={quantumStatus} 
                targetIndex={targetIndex} 
                gridSize={gridSize} 
                position={[12, 0, 0]}
                onFound={() => setQuantumStatus("found")}
              />
            </Suspense>
          </Canvas>

          {/* Labels Overlays */}
          <div className="absolute top-6 left-6 md:left-[15%]">
             <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-red-400" />
                <span className="text-white font-bold font-grotesk tracking-wide">Classical Search</span>
             </div>
             <div className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded border border-white/10 inline-block">
                Time: {(classicalTime / 1000).toFixed(2)}s
             </div>
          </div>

          <div className="absolute top-6 right-6 md:right-[15%] text-right">
             <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-white font-bold font-grotesk tracking-wide">Quantum Search</span>
                <Sigma className="w-4 h-4 text-cyan-400" />
             </div>
             <div className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded border border-white/10 inline-block">
                Time: {(quantumTime / 1000).toFixed(2)}s
             </div>
          </div>
          
          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10">
            <button 
              onClick={startRace}
              disabled={classicalStatus !== "idle" && classicalStatus !== "found"}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Zap className="w-4 h-4" /> Run Benchmark
            </button>
            <button 
              onClick={resetRace}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Technical Deep Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl border border-white/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
              <Binary className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Classical Limitation</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Finding a specific item in an unsorted database of N items requires a classical computer to check each item one by one. On average, this takes N/2 steps. In the worst case, it takes N steps.
            </p>
            <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-xs text-white/40">
              for (i = 0; i &lt; N; i++) &#123;<br/>
              &nbsp;&nbsp;if (data[i] == target) return i;<br/>
              &#125;
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
              <Search className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Amplitude Amplification</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Grover&apos;s algorithm initializes the system in an equal superposition of all states. It then repeatedly applies a &quot;quantum oracle&quot; which flips the phase of the target, and a &quot;diffusion operator&quot; which magnifies the amplitude of the correct answer while shrinking others.
            </p>
            <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-xs text-cyan-400/70">
              |ψ⟩ = (1/√N) Σ |x⟩<br/>
              Apply Oracle O_f<br/>
              Apply Diffuser U_s<br/>
              Repeat ~ (π/4)√N times
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
