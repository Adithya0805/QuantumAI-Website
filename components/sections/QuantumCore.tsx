"use client"

import React, { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls } from "@react-three/drei"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { RotateCcw, Box, ArrowRightLeft, ArrowUpDown } from "lucide-react"

// Dynamically import the 3D simulator to prevent hydration issues
const QubitSimulator = dynamic(() => import("@/components/3d/QubitSimulator"), { 
  ssr: false,
  loading: () => null
})

export default function QuantumCore() {
  // Qubit state angles
  const [theta, setTheta] = useState(0) // Polar angle (0 to PI)
  const [phi, setPhi] = useState(0)     // Azimuthal angle (0 to 2PI)

  const applyGate = (gate: string) => {
    switch (gate) {
      case "H": // Hadamard: moves state halfway between |0> and |1> on X axis
        setTheta(Math.PI / 2)
        setPhi(0)
        break
      case "X": // Pauli-X (NOT gate): flips along X axis (swaps |0> and |1>)
        setTheta(Math.PI - theta)
        // Keep phi same if we're just flipping top to bottom in simple terms
        // Properly, X gate applies a rotation of PI around X axis
        setPhi(phi === 0 ? 0 : Math.PI - phi)
        break
      case "Z": // Pauli-Z: Phase flip. Rotates PI around Z axis (changes sign of phase)
        setPhi((phi + Math.PI) % (2 * Math.PI))
        break
      case "RESET":
        setTheta(0)
        setPhi(0)
        break
    }
  }

  return (
    <section className="relative py-32 px-6 bg-[#020205] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-[0.2em] mb-6"
          >
            Core Mechanics
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-grotesk tracking-tighter text-white mb-6"
          >
            Interactive <span className="text-gradient-cyan">Bloch Sphere</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto text-lg"
          >
            Experience true quantum mechanics. The Bloch sphere is a geometric representation of the pure state space of a two-level quantum mechanical system (a qubit).
          </motion.p>
        </div>

        {/* Simulator Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          
          {/* Controls Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 space-y-6"
          >
            <div className="glass p-8 rounded-3xl border border-white/5 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-6 font-grotesk flex items-center gap-2">
                <Box className="w-5 h-5 text-primary" />
                Quantum Logic Gates
              </h3>
              
              <div className="space-y-4">
                <button 
                  onClick={() => applyGate("H")}
                  className="w-full group relative flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="relative z-10 text-left">
                    <span className="block font-bold text-white mb-1">Hadamard (H)</span>
                    <span className="block text-xs text-white/40 font-mono">Creates superposition</span>
                  </div>
                  <span className="relative z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-primary font-mono text-sm border border-white/10">H</span>
                </button>

                <button 
                  onClick={() => applyGate("X")}
                  className="w-full group relative flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="relative z-10 text-left">
                    <span className="block font-bold text-white mb-1">Pauli-X (X)</span>
                    <span className="block text-xs text-white/40 font-mono">Quantum NOT gate</span>
                  </div>
                  <ArrowUpDown className="relative z-10 w-5 h-5 text-purple-400" />
                </button>

                <button 
                  onClick={() => applyGate("Z")}
                  className="w-full group relative flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="relative z-10 text-left">
                    <span className="block font-bold text-white mb-1">Pauli-Z (Z)</span>
                    <span className="block text-xs text-white/40 font-mono">Phase flip gate</span>
                  </div>
                  <ArrowRightLeft className="relative z-10 w-5 h-5 text-orange-400" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button 
                  onClick={() => applyGate("RESET")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  <RotateCcw className="w-4 h-4" /> Reset State to |0⟩
                </button>
              </div>
            </div>
            
            {/* Live State readout */}
            <div className="glass p-6 rounded-3xl border border-white/5 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">θ (Theta)</span>
                <span className="font-mono text-white font-bold">{(theta * 180 / Math.PI).toFixed(0)}°</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">φ (Phi)</span>
                <span className="font-mono text-white font-bold">{(phi * 180 / Math.PI).toFixed(0)}°</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 aspect-square lg:aspect-video rounded-[3rem] overflow-hidden relative border border-white/10 bg-black/50"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <Canvas>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[4, 2, 4]} fov={50} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
                
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
                
                <QubitSimulator targetTheta={theta} targetPhi={phi} />
              </Suspense>
            </Canvas>

            {/* Instruction overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
              Drag to rotate camera
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
