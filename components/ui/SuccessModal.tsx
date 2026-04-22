"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import confetti from "canvas-confetti"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Transmission Successful", 
  message = "Thank you for your response! We will contact you shortly." 
}: SuccessModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/50" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6 py-4">
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30"
              >
                <CheckCircle2 className="w-10 h-10 text-cyan-400" />
              </motion.div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
                  {title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-sm mx-auto">
                  {message}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="mt-4 px-10 py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-colors"
              >
                ACKNOWLEDGE
              </motion.button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
