"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Calendar, Users, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { track } from '@vercel/analytics'
import { demoSchema, type DemoInput } from "@/lib/validations"
import SuccessModal from "@/components/ui/SuccessModal"

interface DemoRequestModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function DemoRequestModal({ isOpen, setIsOpen }: DemoRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema)
  })

  const onSubmit = async (data: DemoInput) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || "Submission failed")

      toast.success("Consultation Scheduled", {
        description: "Our quantum engineers will reach out on your preferred date."
      })
      
      track('demo_request', { teamSize: data.teamSize })
      
      setIsOpen(false)
      reset()
      setShowSuccess(true)
    } catch (error) {
      toast.error("Booking Error", {
        description: (error as Error).message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#050508] border border-white/10 p-6 sm:p-10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,240,255,0.15)] z-[101] focus:outline-none custom-scrollbar"
              >
                <div className="flex justify-between items-start mb-8 sticky top-0 bg-[#050508] py-2 z-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-grotesk tracking-tight">Request Advanced Demo</h2>
                    <p className="text-white/40 text-xs sm:text-sm">Experience the power of edge quantum computing first-hand.</p>
                  </div>
                  <Dialog.Close asChild>
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                      <X className="w-5 h-5 text-white/40 group-hover:text-white" />
                    </button>
                  </Dialog.Close>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-primary/60 ml-1">Full Name</label>
                      <input
                        {...register("name")}
                        placeholder="Elon Musk"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] uppercase font-mono">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-primary/60 ml-1">Business Email</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="elon@spacex.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] uppercase font-mono">{errors.email.message}</p>}
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-primary/60 ml-1">Organization</label>
                      <input
                        {...register("company")}
                        placeholder="Tesla"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all"
                      />
                      {errors.company && <p className="text-red-500 text-[10px] uppercase font-mono">{errors.company.message}</p>}
                    </div>

                    {/* Team Size */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-primary/60 ml-1">Team Size</label>
                      <div className="relative">
                        <select
                          {...register("teamSize")}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                        >
                          <option value="1-10" className="bg-black">1 - 10</option>
                          <option value="11-50" className="bg-black">11 - 50</option>
                          <option value="51-200" className="bg-black">51 - 200</option>
                          <option value="200+" className="bg-black">200+</option>
                        </select>
                        <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-primary/60 ml-1">Target Date</label>
                      <div className="relative">
                        <input
                          {...register("preferredDate")}
                          type="date"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                      </div>
                    </div>

                    {/* Phone (Optional) */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-primary/60 ml-1">Phone Number</label>
                      <input
                        {...register("phone")}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-primary/60 ml-1">Project Details</label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-orange-500 text-black font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Secure Consultation <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[9px] text-white/10 font-mono tracking-widest">
                    END-TO-END QUANTUM ENCRYPTION MANDATORY
                  </p>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        title="Consultation Scheduled"
        message="Thank you for your response! Our quantum engineers will reach out on your preferred date shortly."
      />
    </Dialog.Root>
  )
}
