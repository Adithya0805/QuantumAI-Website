"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Copy, Check, Play, RotateCcw, Cpu } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import DemoRequestModal from "@/components/forms/DemoRequestModal"
import { ArrowRight } from "lucide-react"

const languages = [
  { 
    id: "python", 
    label: "Python", 
    code: `import quantum_ai as qai\n\n# Initialize with room-temp coherence\nengine = qai.QuantumEngine(mode='hybrid')\n\n# Map tensors to quantum gates\nmodel = qai.models.ResNet50(weights='quantum')\n\n# Zero-latency inference\nresults = engine.predict(input_data)\nprint(f"Confidence: {results.conf}")` 
  },
  { 
    id: "javascript", 
    label: "JavaScript", 
    code: `import { Quantum } from "@qai/sdk";\n\nconst q = new Quantum({ accelerator: "local" });\n\n// Run massively parallel inference\nconst output = await q.process(buffer);\n\nconsole.log(\`Processed in \${output.latency}ms\`);` 
  },
  { 
    id: "rust", 
    label: "Rust", 
    code: `use quantum_ai::prelude::*;\n\nfn main() -> Result<()> {\n    let q = Engine::new(Config::high_precision())?;\n    \n    // Direct silicon memory mapping\n    let result = q.compute(&data)?;\n    \n    println!("Flux: {:?}", result.metrics);\n    Ok(())\n}` 
  }
]

export default function Demo() {
  const [activeTab, setActiveTab] = useState(languages[0])
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [isSimulating, setIsSimulating] = useState(false)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulation Logic
  const runSimulation = async () => {
    if (isSimulating) return
    setIsSimulating(true)
    setTerminalLogs(["[SYS] Initializing Quantum Core...", "[SYS] Calibrating Superposition States..."])
    setProgress(10)

    await new Promise(r => setTimeout(r, 800))
    setTerminalLogs(prev => [...prev, "[OK] Entanglement established.", "[OK] Coherence time: 504μs"])
    setProgress(40)

    await new Promise(r => setTimeout(r, 1000))
    setTerminalLogs(prev => [...prev, "[RUN] Executing Neural Gates...", "[RUN] Tensors mapped to ASIC..."])
    setProgress(75)

    await new Promise(r => setTimeout(r, 1200))
    setTerminalLogs(prev => [...prev, "[FINISH] Inference dynamic scale complete.", "[FINISH] Latency: 0.12ms"])
    setProgress(100)
    setIsSimulating(false)
    toast.success("Simulation Complete", { description: "Quantum inference successful with 0.12ms latency." })
  }

  const resetSimulation = () => {
    setIsSimulating(false)
    setTerminalLogs([])
    setProgress(0)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code)
    setCopied(true)
    toast.info("Code copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  // Effect for typing animation on tab change
  useEffect(() => {
    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx <= activeTab.code.length) {
        setDisplayText(activeTab.code.slice(0, currentIdx))
        currentIdx++
      } else {
        clearInterval(interval)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [activeTab])

  return (
    <section className="relative z-10 py-32 px-6 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12 w-full"
            >
              <h2 className="text-5xl md:text-7xl font-bold font-grotesk tracking-tighter text-white mb-8">
                Run in <br />
                <span className="text-gradient-cyan">Superposition</span>
              </h2>
              <p className="text-white/40 text-lg max-w-lg mb-12 mx-auto lg:ml-0">
                Our universal SDK bridges high-level abstraction with low-level quantum mechanics. Zero bottlenecks, absolute performance.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="px-8 py-4 rounded-full bg-primary text-black font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
                >
                  <Play className={isSimulating ? "animate-pulse" : ""} size={20} />
                  {isSimulating ? "Simulating..." : "Run Simulation"}
                </button>
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="px-8 py-4 rounded-full border border-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/5 transition-all"
                >
                  Schedule Demo <ArrowRight size={20} />
                </button>
                <button
                  onClick={resetSimulation}
                  className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </motion.div>

            {/* Terminal Visualizer */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-3xl overflow-hidden relative">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
                   <Terminal size={14} /> System Terminal
                 </div>
                 <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Live Feed</div>
               </div>

               <div className="space-y-3 h-48 font-mono text-xs overflow-y-auto custom-scrollbar">
                 <AnimatePresence mode="popLayout">
                   {terminalLogs.map((log, i) => (
                     <motion.div
                       key={i + log}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className={cn(
                         "flex gap-4",
                         log.includes("OK") ? "text-emerald-400" : 
                         log.includes("RUN") ? "text-blue-400" :
                         log.includes("FINISH") ? "text-primary" : "text-white/40"
                       )}
                     >
                       <span className="opacity-30">{new Date().toLocaleTimeString().split(' ')[0]}</span>
                       <span>{log}</span>
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 {terminalLogs.length === 0 && (
                   <div className="text-white/10 flex items-center justify-center h-full italic">Waiting for execution...</div>
                 )}
               </div>

               {/* Progress Bar */}
               <div className="mt-6 pt-6 border-t border-white/5">
                 <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase mb-2">
                   <span>Core Activity</span>
                   <span>{progress}%</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                     className="h-full bg-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                   />
                 </div>
               </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="rounded-[40px] border border-white/10 bg-[#050508] overflow-hidden shadow-2xl">
              {/* Tab Header */}
              <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setActiveTab(lang)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        activeTab.id === lang.id 
                        ? "bg-primary/20 text-primary border border-primary/20" 
                        : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="p-10 font-mono text-sm leading-relaxed overflow-x-auto min-h-[400px]">
                <pre className="whitespace-pre">
                   <code className="text-blue-300">
                     {displayText.split('\n').map((line, i) => (
                       <div key={i} className="flex gap-6">
                         <span className="text-white/10 w-4 text-right select-none">{i + 1}</span>
                         <span className={cn(
                           line.startsWith('import') || line.startsWith('use') ? "text-purple-400" :
                           line.includes('Quantum') || line.includes('Engine') ? "text-primary" :
                           line.startsWith('#') || line.startsWith('//') ? "text-white/20" : "text-blue-200"
                         )}>
                           {line}
                         </span>
                       </div>
                     ))}
                     <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-primary ml-1 translate-y-0.5"
                      />
                   </code>
                </pre>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
               <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <Cpu size={24} className="text-orange-500" />
               </div>
               <div>
                 <h4 className="text-white font-bold mb-1">ASIC Mapping Enabled</h4>
                 <p className="text-white/40 text-sm">Your code will be cross-compiled to 7nm quantum interconnects automatically.</p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>

      <DemoRequestModal isOpen={isDemoOpen} setIsOpen={setIsDemoOpen} />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </section>
  )
}
