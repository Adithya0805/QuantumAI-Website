"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Loader2, ArrowRight } from "lucide-react"

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type WaitlistValues = z.infer<typeof waitlistSchema>

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema)
  })

  const onSubmit = async (data: WaitlistValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Submission failed")

      toast.success("Welcome aboard!", {
        description: "You've been added to the quantum hardware waitlist."
      })
      reset()
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact support."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
      <div className="flex-1 relative">
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-primary transition-all pr-12"
        />
        {errors.email && (
          <p className="absolute -bottom-6 left-6 text-red-500 text-[10px] font-mono uppercase tracking-widest">
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-4 rounded-full bg-primary text-black font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Join Waitlist <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
