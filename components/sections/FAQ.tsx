"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-white/5", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-8 text-left text-xl font-bold transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180 text-white font-grotesk group",
        className
      )}
      {...props}
    >
      <span className="group-hover:translate-x-2 transition-transform duration-300">{children}</span>
      <ChevronDown className="h-5 w-5 shrink-0 text-white/40 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-lg transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-8 pt-0 text-white/50 leading-relaxed font-medium", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

const faqItems = [
  {
    q: "Is quantum AI available today?",
    a: "Yes, our pilot program is currently live for enterprise partners. We offer cloud-based access to our Q1 processors, allowing you to integrate quantum acceleration into your existing AI pipelines immediately."
  },
  {
    q: "How do I integrate QuantumAI into my stack?",
    a: "We provide SDKs for Python (PyTorch/TensorFlow), JavaScript, and Rust. Integration typically takes less than 15 lines of code—simply wrap your existing model with our QuantumOptimizer class."
  },
  {
    q: "What's the pricing model?",
    a: "We offer tiered pricing based on compute-qubit-hours. Our 'Developer' tier starts at $0, while 'Pro' and 'Enterprise' tiers provide dedicated hardware allocation and 24/7 technical support."
  },
  {
    q: "Do I need quantum expertise?",
    a: "Not at all. Our platform abstracts away the complexity of quantum gate logic. If you can write a standard neural network, you can use QuantumAI. Our compiler automatically optimizes your model for quantum execution."
  },
  {
    q: "What about data security?",
    a: "We employ post-quantum encryption for all data in transit and at rest. Your training data is processed in isolated quantum enclaves, ensuring zero-knowledge privacy throughout the computation cycle."
  }
]

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = useMemo(() => {
    return faqItems.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <section className="py-32 px-6 relative z-30 overflow-hidden">
      {/* Background Eclipse effect localized to this section to hide the fixed starfield behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#020205] -z-10 opacity-60 blur-3xl rounded-full" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black font-grotesk text-white uppercase italic tracking-tight">
            Everything You <span className="text-gradient-cyan">Need To Know</span>
          </h2>
          <p className="mt-4 text-white/40 font-mono text-xs uppercase tracking-[0.3em]">Scientific Briefing & FAQ</p>
          
          {/* Search Filter */}
          <div className="max-w-md mx-auto relative group mt-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
            <input 
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-12 text-white focus:outline-none focus:border-primary/50 transition-all backdrop-blur-3xl shadow-2xl"
            />
            {searchQuery && (
                <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <X className="w-4 h-4 text-white/40" />
                </button>
            )}
          </div>
        </div>

        <div className="glass-morphism rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
          
          <Accordion type="single" collapsible className="w-full">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                    <AccordionTrigger className="text-left py-10">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-lg">{item.a}</AccordionContent>
                </AccordionItem>
              ))
            ) : (
                <div className="py-12 text-center">
                    <p className="text-white/40 font-mono text-sm uppercase tracking-widest">No matching frequencies found</p>
                </div>
            )}
          </Accordion>
        </div>
      </div>

      <style jsx>{`
        .glass-morphism {
          background: rgba(10, 10, 15, 0.85); /* Darker background to separate from starfield */
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </section>

  )
}

