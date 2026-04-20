"use client"

import React from "react"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        glarePosition="all"
        className="h-full"
      >
        <div
          className={cn(
            "h-full glass-morphism p-6 rounded-2xl transition-all duration-300 group hover:border-primary/40",
            className
          )}
        >
          {children}
        </div>
      </Tilt>
    </motion.div>
  )
}
