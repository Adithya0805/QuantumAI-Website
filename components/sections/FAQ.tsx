"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-white/10", className)}
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
        "flex flex-1 items-center justify-between py-8 text-left text-xl font-bold transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180 text-white font-grotesk",
        className
      )}
      {...props}
    >
      {children}
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
    <div className={cn("pb-8 pt-0 text-white/50 leading-relaxed", className)}>{children}</div>
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
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-grotesk text-white">FAQ</h2>
          <p className="mt-4 text-white/40">Everything you need to know about the future of computing.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
