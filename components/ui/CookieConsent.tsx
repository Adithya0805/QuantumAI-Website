"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("quantum-cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("quantum-cookie-consent", "true")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
        >
          <div className="bg-[#0A0A0F]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-white font-grotesk">Quantum Cookies</h4>
              </div>
              
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                We use qubits to store your preferences. By continuing, you agree to our use of localized quantum coherence metrics for performance tracking.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={accept}
                  className="flex-1 bg-primary text-black font-bold py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-6 py-3 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  Essential Only
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/20 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
