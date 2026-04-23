"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Zap, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { newsletterSchema, type NewsletterInput } from "@/lib/validations"

export default function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema)
  })

  const onSubmit = async (data: NewsletterInput) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || "Subscription failed")

      toast.success("Synchronized!", {
        description: "Welcome to the newsfeed."
      })
      reset()
      setShowSuccess(true)
    } catch (error) {
      toast.error("Sync Failed", {
        description: error.message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-primary/10 border border-primary/20"
          >
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-white/80 uppercase tracking-widest">Protocol Synchronized</span>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="group relative flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <input
                {...register("email")}
                type="email"
                placeholder="Stay updated via email"
                disabled={isSubmitting}
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-white/30 disabled:opacity-50"
              />
              {errors.email && (
                <p className="absolute -bottom-6 left-6 text-red-500 text-[10px] font-mono uppercase">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 rounded-full bg-primary text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sync <Zap className="w-3.5 h-3.5 fill-current" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

