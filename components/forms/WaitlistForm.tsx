"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, ArrowRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { waitlistSchema, type WaitlistInput } from "@/lib/validations"

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Submission failed")
      }

      toast.success("Welcome aboard!", {
        description: result.message
      })
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#FF6B00', '#B537F2']
      })

      setIsSuccess(true)
      reset()
    } catch (error: any) {
      toast.error("Submission Error", {
        description: error.message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-white/5 border border-primary/20 rounded-2xl backdrop-blur-xl"
      >
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary shadow-glow" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You're in the Loop!</h3>
        <p className="text-white/60">We've added you to the exclusive quantum waitlist. Stay tuned for updates.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-primary hover:text-primary/80 transition-colors uppercase text-xs font-mono tracking-widest"
        >
          Add Another Response
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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20"
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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/20"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-mono uppercase pl-1">{errors.email.message}</p>
          )}
        </div>

        {/* Company Field (Optional) */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Company (Optional)</label>
          <input
            {...register("company")}
            placeholder="Quantum Corp"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all placeholder:text-white/20"
          />
        </div>

        {/* Use Case Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Primary Use Case</label>
          <select
            {...register("useCase")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
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
        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary/80 text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
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
