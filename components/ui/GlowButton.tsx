"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
}

export default function GlowButton({ children, className, variant = "primary", ...props }: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const variants = {
    primary: "bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90",
    secondary: "bg-transparent text-white border-white/20 hover:bg-white/5",
    ghost: "bg-transparent text-white/70 hover:text-white",
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden px-8 py-3 rounded-full font-medium transition-all duration-300 border backdrop-blur-sm group",
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Glow Effect */}
      <span
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 240, 255, 0.2), transparent)`
            : "",
        }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Border Glow for Primary */}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full border border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity blur-[4px]" />
      )}
    </motion.button>
  )
}
