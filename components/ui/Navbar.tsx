"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Cpu, Rocket, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import ThemeToggle from "./ThemeToggle"
import { Dialog, DialogContent, DialogTrigger } from "./Dialog"
import WaitlistForm from "@/components/forms/WaitlistForm"
import { toast } from "sonner"

const navLinks = [
  { name: "Science", href: "#science" },
  { name: "Comparison", href: "#comparison" },
  { name: "Applications", href: "#applications" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLaunch = () => {
    setIsLaunching(true)
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Connecting to Quantum Core...',
        success: () => {
          setIsLaunching(false)
          return 'Console Initialized'
        },
        error: 'Connection Lost',
      }
    )
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4",
        scrolled ? "bg-black/60 backdrop-blur-3xl border-b border-white/5 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform glow-cyan">
            <Cpu className="text-primary w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-grotesk tracking-tighter text-white">
            Quantum<span className="text-primary">AI</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono text-white/50 hover:text-primary transition-colors tracking-widest uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={handleLaunch}
            disabled={isLaunching}
            className="px-6 py-2 rounded-full border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary/10 transition-all flex items-center gap-2"
          >
            {isLaunching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
            Launch Console
          </button>
          
          <Dialog>
             <DialogTrigger asChild>
               <button className="px-6 py-2 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all">
                  Join Pilot
               </button>
             </DialogTrigger>
             <DialogContent>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white font-grotesk mb-2">Join Early Access</h2>
                  <p className="text-white/40 text-sm">Be the first to harness the power of quantum computing.</p>
                </div>
                <WaitlistForm />
             </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-50 bg-[#0A0A0F] md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold font-grotesk text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                 <button 
                  onClick={handleLaunch}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold"
                 >
                    Launch Console
                 </button>
                 <button className="w-full py-4 rounded-2xl bg-primary text-black font-bold">
                    Join Early Access
                 </button>
              </div>
            </div>
            <button
              className="absolute top-6 right-6 p-4 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
