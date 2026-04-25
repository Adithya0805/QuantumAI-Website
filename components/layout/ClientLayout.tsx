"use client"

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import { Toaster } from "sonner";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.log('SW registration failed: ', err);
        });
      });
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LenisProvider>
        <ScrollProgress />
        <Navbar />
        {children}
        <PerformanceDashboard />
        <PerformanceMonitor />
        <CustomCursor />
        <Toaster position="bottom-right" theme="dark" />
        <Analytics />
        <SpeedInsights />
      </LenisProvider>
    </ThemeProvider>
  );
}
