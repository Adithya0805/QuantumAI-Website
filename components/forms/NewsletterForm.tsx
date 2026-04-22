"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Zap } from "lucide-react"
import { newsletterSchema, type NewsletterInput } from "@/lib/validations"
import SuccessModal from "@/components/ui/SuccessModal"

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
        description: "You're now subscribed to the quantum newsfeed."
      })
      reset()
      setShowSuccess(true)
    } catch (error: any) {
      toast.error("Sync Failed", {
        description: error.message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="group relative flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <div className="flex-1 relative">
        <input
          {...register("email")}
          type="email"
          placeholder="Stay updated via email"
          className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-white/30"
        />
        {errors.email && (
          <p className="absolute -bottom-5 left-6 text-red-500 text-[9px] font-mono uppercase">
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 rounded-full bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Sync <Zap className="w-3.5 h-3.5 fill-current" />
          </>
        )}
      </button>
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        title="Sync Successful"
        message="Thank you for subscribing! We will contact you shortly with the latest updates."
      />
    </form>
  )
}
