"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, ArrowRight, CheckCircle2, Share2, Mail } from "lucide-react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { waitlistSchema, type WaitlistInput } from "@/lib/validations"

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema)
  })

  const onSubmit = async (data: WaitlistInput) => {
    setIsSubmitting(true)
    setServerError(null)
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setServerError("This email is already on the waitlist 🚀")
          return // Fall through to finally for loading state
        }
        throw new Error(result.error || "Submission failed")
      }

      setSubmittedEmail(data.email)
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#FF6B00', '#B537F2']
      })

      reset()
      setShowSuccess(true)
    } catch (error) {
      toast.error("Submission Error", {
        description: error.message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link Copied!", {
      description: "Share the quantum revolution with your friends."
    })
  }

  if (showSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto p-12 rounded-[2.5rem] bg-white/5 border border-primary/30 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,240,255,0.15)] text-center space-y-8"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50"
          >
            <CheckCircle2 className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(0,240,255,1)]" />
          </motion.div>
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            You&apos;re In The <span className="text-gradient-cyan">Quantum Future</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-white/50 font-mono text-sm">
            <Mail className="w-4 h-4" />
            <span>We&apos;ll reach you at <span className="text-white">{submittedEmail}</span></span>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="group flex items-center justify-center gap-2 mx-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest text-white">Share with a friend</span>
        </button>
      </motion.div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 w-full max-w-lg mx-auto p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
    >
      <div className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Candidate Name</label>
          <input
            {...register("name")}
            placeholder="John Doe"
            disabled={isSubmitting}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20 disabled:opacity-50"
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] font-mono uppercase pl-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            disabled={isSubmitting}
            className={`w-full bg-white/5 border rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20 disabled:opacity-50 ${
              serverError || errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-primary'
            }`}
          />
          {(errors.email || serverError) && (
            <p className="text-red-500 text-[10px] font-mono uppercase pl-1">
              {errors.email?.message || serverError}
            </p>
          )}
        </div>

        {/* Company Field (Optional) */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Company (Optional)</label>
          <input
            {...register("company")}
            placeholder="Quantum Corp"
            disabled={isSubmitting}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all placeholder:text-white/20 disabled:opacity-50"
          />
        </div>

        {/* Use Case Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Primary Use Case</label>
          <select
            {...register("useCase")}
            disabled={isSubmitting}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer disabled:opacity-50"
          >
            <option value="" className="bg-black">Select an option</option>
            <option value="research" className="bg-black">Academic Research</option>
            <option value="enterprise" className="bg-black">Enterprise Computing</option>
            <option value="personal" className="bg-black">Personal Development</option>
            <option value="other" className="bg-black">Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary/80 text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all active:scale-[0.98] ${
          isSubmitting ? 'opacity-70' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Initializing Protocol...
          </>
        ) : (
          <>
            Initialize Protocol <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-[10px] text-white/20 font-mono">
        SECURE QUANTUM ENCRYPTION ENABLED
      </p>
    </form>
  )
}

