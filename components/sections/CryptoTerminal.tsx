"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ShieldAlert, Terminal as TerminalIcon, ShieldCheck } from "lucide-react"

type TerminalLine = { text: string; color?: string; bold?: boolean }
type AttackStatus = 'idle' | 'rsa_cracking' | 'rsa_cracked' | 'lattice_defending' | 'lattice_defended'

export default function CryptoTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: "QUANTUM AI OS v12.4.1", color: "text-green-500", bold: true },
    { text: "Secured connection established.", color: "text-green-500" },
    { text: "Waiting for cryptography protocol...", color: "text-green-500/70" }
  ])
  const [status, setStatus] = useState<AttackStatus>('idle')
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const addLine = (line: TerminalLine) => setLines(prev => [...prev, line])
  
  const runShorAttack = async () => {
    if (status !== 'idle') return
    setStatus('rsa_cracking')
    setLines([
      { text: "> init_shor_algorithm --target RSA-2048", color: "text-green-400" },
      { text: "Initializing Quantum Fourier Transform...", color: "text-green-500/70" }
    ])

    const steps = [
      { t: 1000, l: { text: "Finding period (r) of function f(x) = a^x mod N...", color: "text-yellow-400" } },
      { t: 2500, l: { text: "[WARNING] High probability amplitude detected at r = 589234812", color: "text-orange-400" } },
      { t: 3500, l: { text: "Period found. Calculating Greatest Common Divisor...", color: "text-yellow-400" } },
      { t: 4500, l: { text: "p = 112839412... (1024 bits) | q = 981273912... (1024 bits)", color: "text-red-400", bold: true } },
      { t: 5000, l: { text: "[CRITICAL] RSA-2048 CRACKED. Private Key Extracted.", color: "text-red-500", bold: true } }
    ]

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.t - (steps[steps.indexOf(step)-1]?.t || 0)))
      if (status !== 'rsa_cracking') return // check if reset was hit
      addLine(step.l)
    }
    
    setStatus('rsa_cracked')
  }

  const runLatticeDefense = async () => {
    setStatus('lattice_defending')
    setLines([
      { text: "> deploy_shield --protocol CRYSTALS-Kyber", color: "text-cyan-400" },
      { text: "Initializing Module-Learning With Errors (M-LWE)...", color: "text-cyan-500/70" }
    ])

    const steps = [
      { t: 1000, l: { text: "Generating lattice polynomial vectors...", color: "text-blue-400" } },
      { t: 2000, l: { text: "Injecting artificial error bounds...", color: "text-blue-400" } },
      { t: 3000, l: { text: "Attempting Shor's attack on new public key...", color: "text-yellow-400" } },
      { t: 4500, l: { text: "[ERROR] Shortest Vector Problem (SVP) unsolvable by QFT.", color: "text-green-400", bold: true } },
      { t: 5000, l: { text: "[SECURE] Lattice Shield Active. Quantum Attack Failed.", color: "text-cyan-400", bold: true } }
    ]

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.t - (steps[steps.indexOf(step)-1]?.t || 0)))
      if (status !== 'lattice_defending') return
      addLine(step.l)
    }
    
    setStatus('lattice_defended')
  }

  const resetTerminal = () => {
    setStatus('idle')
    setLines([
      { text: "QUANTUM AI OS v12.4.1", color: "text-green-500", bold: true },
      { text: "System rebooted. Awaiting commands.", color: "text-green-500/70" }
    ])
  }

  return (
    <section className="relative py-32 px-6 bg-black border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-red-500/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono uppercase tracking-[0.2em] mb-6"
          >
            Post-Quantum Security
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-grotesk tracking-tighter text-white mb-6"
          >
            Shor&apos;s <span className="text-gradient-cyan">Algorithm</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Modern encryption (RSA) relies on the fact that classical computers cannot quickly find the prime factors of large numbers. A quantum computer running Shor&apos;s algorithm can do it exponentially faster, rendering current cryptography obsolete. 
            Our platform uses <strong className="text-cyan-400">Lattice-Based Cryptography</strong> to remain secure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass p-8 rounded-3xl border border-white/5 space-y-6 h-full flex flex-col justify-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-grotesk flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-400" /> Vulnerability Demo
                </h3>
                <p className="text-white/50 text-sm mb-4">Launch a simulated quantum attack against standard 2048-bit RSA encryption.</p>
                <button 
                  onClick={runShorAttack}
                  disabled={status !== 'idle' && status !== 'lattice_defended'}
                  className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Run Shor&apos;s Algorithm
                </button>
              </div>

              <div className="w-full h-px bg-white/10" />

              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-grotesk flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" /> Quantum Defense
                </h3>
                <p className="text-white/50 text-sm mb-4">Deploy Post-Quantum Lattice Cryptography to secure the system against quantum attacks.</p>
                <button 
                  onClick={runLatticeDefense}
                  disabled={status !== 'rsa_cracked'}
                  className="w-full py-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Enable Lattice Shield
                </button>
              </div>

              {(status !== 'idle') && (
                <button 
                  onClick={resetTerminal}
                  className="mt-auto pt-4 text-white/30 text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                  Reset Terminal
                </button>
              )}
            </div>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col h-[400px]">
              
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#111]">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="ml-4 flex items-center gap-2 text-white/30 text-xs font-mono">
                  <TerminalIcon className="w-3 h-3" />
                  root@quantum-core:~
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 flex-1 overflow-y-auto font-mono text-sm space-y-2 relative">
                {/* CRT Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0),rgba(255,255,255,0),rgba(255,255,255,0.02))] bg-[length:100%_4px]" />
                
                {lines.map((line, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${line.color || 'text-white'} ${line.bold ? 'font-bold' : ''}`}
                  >
                    {line.text}
                  </motion.div>
                ))}
                
                {/* Blinking cursor */}
                {(status === 'rsa_cracking' || status === 'lattice_defending') && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-white/50 inline-block align-middle ml-1"
                  />
                )}
                
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
