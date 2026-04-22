"use client"

import NewsletterForm from "@/components/forms/NewsletterForm"
import { motion } from "framer-motion"

export default function Newsletter() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      
      <div className="max-w-4xl mx-auto rounded-[3rem] glass border border-white/5 p-12 md:p-20 text-center relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-black font-grotesk tracking-tight text-white uppercase italic">
              Stay Ahead of <span className="text-gradient-cyan">The Curve</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-medium">
              Join 5,000+ researchers and engineers receiving weekly deep-dives into quantum hardware and neural-link protocols.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <NewsletterForm />
          </motion.div>

          <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.4em]">
            Zero Spam • encrypted delivery • instantaneous sync
          </p>
        </div>
      </div>
    </section>
  )
}
