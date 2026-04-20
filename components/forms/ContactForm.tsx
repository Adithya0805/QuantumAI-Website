"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"
import { motion } from "framer-motion"
import { contactSchema, type ContactInput } from "@/lib/validations"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messageLength, setMessageLength] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || "Failed to send message")

      toast.success("Transmission Received", {
        description: "Our team will decrypt and respond shortly."
      })
      reset()
      setMessageLength(0)
    } catch (error: any) {
      toast.error("Transmission Error", {
        description: error.message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 w-full max-w-2xl mx-auto p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/60 ml-1">Identity</label>
          <input
            {...register("name")}
            placeholder="Name or Alias"
            className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all placeholder:text-white/10"
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] font-mono uppercase pl-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/60 ml-1">Endpoint</label>
          <input
            {...register("email")}
            type="email"
            placeholder="email@network.com"
            className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all placeholder:text-white/10"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-mono uppercase pl-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/60 ml-1">Subject Header</label>
        <input
          {...register("subject")}
          placeholder="What is this regarding?"
          className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all placeholder:text-white/10"
        />
        {errors.subject && (
          <p className="text-red-500 text-[10px] font-mono uppercase pl-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2 relative">
        <label className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/60 ml-1">Message Body</label>
        <textarea
          {...register("message", {
            onChange: (e) => setMessageLength(e.target.value.length)
          })}
          rows={6}
          placeholder="Transmit your query..."
          className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all placeholder:text-white/10 resize-none"
        />
        <div className="absolute bottom-4 right-5 text-[10px] font-mono text-white/20">
          CHARS: {messageLength} / 1000
        </div>
        {errors.message && (
          <p className="text-red-500 text-[10px] font-mono uppercase pl-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-cyan-400 active:scale-[0.98] disabled:opacity-50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 flex items-center gap-2">
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Transmit Data <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </span>
      </button>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse delay-150" />
        </div>
        <p className="text-[9px] text-white/10 font-mono tracking-tighter">
          ENCRYPTED VIA QUANTUM-LATTICE PROTOCOL v2.0
        </p>
      </div>
    </form>
  )
}
