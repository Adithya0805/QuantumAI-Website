"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Database, Zap, Shield, Microscope, Target, ArrowRight, RotateCcw } from "lucide-react"

type Industry = 'finance' | 'healthcare' | 'logistics' | 'cybersecurity'
type DataSize = 'gb' | 'tb' | 'pb'
type Bottleneck = 'speed' | 'security' | 'optimization' | 'discovery'

export default function QuantumReadinessQuiz() {
  const [step, setStep] = useState(0)
  
  // Form State
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [dataSize, setDataSize] = useState<DataSize | null>(null)
  const [bottleneck, setBottleneck] = useState<Bottleneck | null>(null)
  
  // Result State
  const [isCalculating, setIsCalculating] = useState(false)
  const [score, setScore] = useState(0)

  const handleNext = () => {
    if (step === 2) {
      calculateScore()
    } else {
      setStep(s => s + 1)
    }
  }

  const calculateScore = () => {
    setIsCalculating(true)
    setStep(3)
    
    // Fake calculation delay for dramatic effect
    setTimeout(() => {
      let baseScore = 60
      if (dataSize === 'pb') baseScore += 20
      else if (dataSize === 'tb') baseScore += 10
      
      if (industry === 'finance' || industry === 'logistics') baseScore += 15
      else baseScore += 10
      
      if (bottleneck === 'optimization' || bottleneck === 'discovery') baseScore += 5
      
      setScore(Math.min(baseScore, 99)) // Cap at 99 for realism
      setIsCalculating(false)
    }, 2500)
  }

  const resetQuiz = () => {
    setStep(0)
    setIndustry(null)
    setDataSize(null)
    setBottleneck(null)
    setScore(0)
  }

  return (
    <section className="relative py-32 px-6 bg-black border-t border-white/5 overflow-hidden">
      {/* Dynamic Background Glow based on step */}
      <motion.div 
        animate={{ 
          backgroundColor: step === 3 ? "rgba(34, 211, 238, 0.05)" : "rgba(59, 130, 246, 0.05)",
          scale: step === 3 && !isCalculating ? 1.2 : 1
        }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-mono uppercase tracking-[0.2em] mb-6"
          >
            System Assessment
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-grotesk tracking-tighter text-white mb-6"
          >
            Find Your <span className="text-gradient-cyan">Quantum Potential</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto text-lg"
          >
            Answer 3 simple questions to calculate how much your organization&apos;s infrastructure would benefit from Quantum Acceleration.
          </motion.p>
        </div>

        {/* Quiz Container */}
        <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 relative min-h-[400px] flex flex-col">
          
          {/* Progress Bar */}
          {step < 3 && (
            <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}

          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              
              {/* STEP 0: Industry */}
              {step === 0 && (
                <motion.div 
                  key="step0"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white text-center font-grotesk mb-8">What is your primary industry?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'finance', icon: Building2, label: 'Finance & Trading' },
                      { id: 'healthcare', icon: Microscope, label: 'Healthcare & Pharma' },
                      { id: 'logistics', icon: Target, label: 'Logistics & Supply Chain' },
                      { id: 'cybersecurity', icon: Shield, label: 'Cybersecurity' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setIndustry(item.id as Industry); handleNext(); }}
                        className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/50 transition-all"
                      >
                        <item.icon className="w-10 h-10 text-white/40 group-hover:text-cyan-400 mb-4 transition-colors" />
                        <span className="text-white font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1: Data Size */}
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white text-center font-grotesk mb-8">What is your active dataset volume?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'gb', icon: Database, label: 'Gigabytes (GB)', desc: 'Standard business ops' },
                      { id: 'tb', icon: Database, label: 'Terabytes (TB)', desc: 'Large enterprise data' },
                      { id: 'pb', icon: Database, label: 'Petabytes (PB)', desc: 'Massive global scale' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setDataSize(item.id as DataSize); handleNext(); }}
                        className="group flex flex-col items-center text-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/50 transition-all"
                      >
                        <item.icon className="w-10 h-10 text-white/40 group-hover:text-cyan-400 mb-4 transition-colors" />
                        <span className="text-white font-medium mb-2">{item.label}</span>
                        <span className="text-white/40 text-sm">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Bottleneck */}
              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white text-center font-grotesk mb-8">What is your biggest technological bottleneck?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'speed', icon: Zap, label: 'Processing Speed', desc: 'Real-time inference latency' },
                      { id: 'security', icon: Shield, label: 'Cryptography Risk', desc: 'Post-quantum vulnerabilities' },
                      { id: 'optimization', icon: Target, label: 'Route/Port Optimization', desc: 'NP-hard logistical problems' },
                      { id: 'discovery', icon: Microscope, label: 'Material/Drug Discovery', desc: 'Molecular simulation limits' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setBottleneck(item.id as Bottleneck); handleNext(); }}
                        className="group flex flex-col items-start p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/50 transition-all"
                      >
                        <div className="flex items-center gap-4 mb-2">
                          <item.icon className="w-6 h-6 text-white/40 group-hover:text-cyan-400 transition-colors" />
                          <span className="text-white font-medium">{item.label}</span>
                        </div>
                        <span className="text-white/40 text-sm pl-10">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Results */}
              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  {isCalculating ? (
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin mb-8" />
                      <h3 className="text-xl font-bold text-white font-grotesk animate-pulse">Running Quantum Analysis...</h3>
                      <p className="text-white/50 text-sm mt-2 font-mono">Simulating amplitude models across {dataSize?.toUpperCase()} datasets</p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center w-full"
                    >
                      {/* Score Circle */}
                      <div className="relative w-48 h-48 mb-8">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" className="stroke-white/10 stroke-[8] fill-none" />
                          <motion.circle 
                            cx="96" cy="96" r="88" 
                            className="stroke-cyan-400 stroke-[8] fill-none" 
                            strokeLinecap="round"
                            initial={{ strokeDasharray: 553, strokeDashoffset: 553 }}
                            animate={{ strokeDashoffset: 553 - (553 * score) / 100 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-bold text-white font-grotesk">{score}%</span>
                          <span className="text-xs text-cyan-400 font-mono tracking-widest mt-1">MATCH</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white text-center font-grotesk mb-4">
                        High Quantum Potential Detected
                      </h3>
                      <p className="text-white/60 text-center max-w-lg mb-8">
                        Your operations in <strong className="text-white">{industry}</strong> dealing with <strong className="text-white">{dataSize?.toUpperCase()}</strong> of data face NP-hard <strong className="text-white">{bottleneck}</strong> constraints. Quantum acceleration can provide exponential speedups for this exact profile.
                      </p>

                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-colors">
                          Schedule Architecture Review <ArrowRight className="w-5 h-5" />
                        </button>
                        <button onClick={resetQuiz} className="p-4 rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                          <RotateCcw className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
