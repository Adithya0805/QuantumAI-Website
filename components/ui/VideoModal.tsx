"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
}

export default function VideoModal({ isOpen, onClose, videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ" }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12 overflow-hidden"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-[160] p-4 text-white hover:text-primary transition-colors hover:scale-110 active:scale-95"
          >
            <X size={40} />
          </button>

          {/* Video Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative z-[160] w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,240,255,0.2)] border border-white/10"
          >
            <iframe
              src={`${videoUrl}?autoplay=1`}
              title="QuantumAI Platform Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[160] text-center">
             <p className="text-white/40 text-xs font-mono uppercase tracking-[0.5em] animate-pulse">
                Quantum Stream Initialized
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
