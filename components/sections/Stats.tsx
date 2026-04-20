"use client"

import React, { useEffect, useRef } from "react"
import gsap from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const stats = [
  { label: "Faster Inference", value: 1000, suffix: "x", prefix: "" },
  { label: "Less Power", value: 90, suffix: "%", prefix: "" },
  { label: "Operations/sec", value: 50, suffix: "M+", prefix: "" },
  { label: "System Uptime", value: 99.99, suffix: "%", prefix: "" },
]

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((_, i) => {
        const target = { val: 0 }
        const item = document.querySelectorAll(".stat-number")[i]
        const finalVal = stats[i].value
        
        gsap.to(target, {
          val: finalVal,
          duration: 2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            item.innerHTML = target.val.toFixed(finalVal % 1 === 0 ? 0 : 2)
          },
        })
      })

      gsap.from(".stat-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative z-20 bg-black/40 backdrop-blur-2xl border-y border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-4xl md:text-5xl font-bold font-grotesk text-white mb-2">
                {stat.prefix}
                <span className="stat-number">0</span>
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <div className="text-sm font-mono text-white/40 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
