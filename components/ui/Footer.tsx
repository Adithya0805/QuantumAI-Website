"use client"

import React from "react"
import { Cpu, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react"
import NewsletterForm from "@/components/forms/NewsletterForm"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0A0A0F] pt-24 pb-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="h-full w-full bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-grotesk text-white">QuantumAI</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Pioneering the next era of edge computing and quantum-inspired AI hardware for global infrastructure.
            </p>
            <div className="mb-8">
               <NewsletterForm />
            </div>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-primary hover:border-primary/50 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Product", links: ["Platform", "Chipsets", "HCI", "Roadmap"] },
            { title: "Developer", links: ["Documentation", "API Reference", "Support", "Github"] },
            { title: "Company", links: ["About", "Careers", "News", "Media Kit"] },
          ].map((column, i) => (
            <div key={i}>
              <h4 className="text-white font-bold mb-6 font-grotesk">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/40 hover:text-white text-sm flex items-center gap-1 group transition-colors">
                      {link} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
             2024 QuantumAI Platform. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-xs font-mono uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="text-white/20 text-xs font-mono flex items-center gap-1">
            Built with <span className="text-primary animate-pulse">⚡</span> by Antigravity
          </div>
        </div>
      </div>
    </footer>
  )
}
