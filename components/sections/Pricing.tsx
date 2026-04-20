"use client"

import React, { useState } from "react"
import { Check } from "lucide-react"
import GlassCard from "@/components/ui/GlassCard"
import GlowButton from "@/components/ui/GlowButton"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/Switch"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog"
import WaitlistForm from "@/components/forms/WaitlistForm"
import ContactForm from "@/components/forms/ContactForm"
import { motion, AnimatePresence } from "framer-motion"

const tiers = [
  {
    name: "Starter",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Perfect for edge prototyping and small scale projects.",
    features: [
      "1x Quantum Accelerator",
      "Standard SDK Support",
      "Community Forums",
      "5GB Data Throughput",
    ],
  },
  {
    name: "Pro",
    priceMonthly: "$499",
    priceYearly: "$399",
    description: "Designed for commercial applications and AI teams.",
    features: [
      "4x Quantum Accelerators",
      "Priority API Access",
      "Dedicated Support",
      "Unlimited Throughput",
      "Custom Firmware Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    description: "Global scale infrastructure and custom silicon solutions.",
    features: [
      "Custom ASIC Design",
      "On-site Deployment",
      "24/7 VIP Support",
      "Quantum Encryption Native",
      "Direct Interconnect (10Tbps)",
    ],
  },
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-grotesk tracking-tighter text-white mb-6">
            Scale Your <span className="text-gradient-cyan">Ambition</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("text-sm font-bold transition-colors", !isYearly ? "text-primary" : "text-white/40")}>Monthly</span>
            <Switch 
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={cn("text-sm font-bold transition-colors", isYearly ? "text-primary" : "text-white/40")}>Yearly</span>
            <span className="ml-2 px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">Save 20%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <GlassCard 
              key={i} 
              delay={i * 0.1}
              className={cn(
                tier.popular ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20" : ""
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest font-mono">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-grotesk">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-4xl font-bold text-white font-grotesk"
                    >
                      {isYearly ? tier.priceYearly : tier.priceMonthly}
                    </motion.span>
                  </AnimatePresence>
                  {tier.priceMonthly !== "Custom" && <span className="text-white/40 font-mono text-sm">/mo</span>}
                </div>
                <p className="mt-4 text-white/40 text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <GlowButton 
                    variant={tier.popular ? "primary" : "secondary"} 
                    className="w-full"
                  >
                    {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </GlowButton>
                </DialogTrigger>
                <DialogContent>
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white font-grotesk mb-2">
                      {tier.name === "Enterprise" ? "Contact Architecture Team" : `Initialize ${tier.name}`}
                    </h2>
                    <p className="text-white/40">
                      {tier.name === "Enterprise" 
                        ? "Discuss custom silicon solutions with our lead engineers." 
                        : "Enter your details to configure your quantum environment."}
                    </p>
                  </div>
                  {tier.name === "Enterprise" ? (
                    <ContactForm />
                  ) : (
                    <WaitlistForm />
                  )}
                </DialogContent>
              </Dialog>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
