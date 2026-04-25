"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useCallback, useEffect } from "react"
import { PerspectiveCamera } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { useRef } from "react"
import CameraRig from "./CameraRig"
import BlackHole from "./BlackHole"
import SolarSystem from "./SolarSystem"
import StarField from "./StarField"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { SceneErrorBoundary } from "./SceneErrorBoundary"
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality"
import { useNetworkStatus } from "@/hooks/useNetworkStatus"

interface SceneProps {
  children?: React.ReactNode
}

// Helper to record frames for performance monitoring
function FrameRecorder({ onFrame }: { onFrame: () => void }) {
  useFrame(() => {
    onFrame()
  })
  return null
}

export default function Scene({ children }: SceneProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const quality = useAdaptiveQuality()
  const networkQuality = useNetworkStatus()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const checkDevice = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const width = window.innerWidth
        if (width < 640) setDeviceType('mobile')
        else if (width < 1024) setDeviceType('tablet')
        else setDeviceType('desktop')
      }, 250)
    }
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  const handleBlackHoleClick = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsPaused(true)
    timeoutRef.current = setTimeout(() => setIsPaused(false), 3000)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 bg-[#020205]">
      <Canvas
        shadows={quality.shadowsEnabled}
        onCreated={() => {
          // Record frame logic is handled by useAdaptiveQuality hook
          // but we can trigger it here if needed or use a more integrated approach
        }}
        gl={{ 
          antialias: quality.fps >= 50,
          powerPreference: "high-performance",
          alpha: true
        }}
        dpr={deviceType === 'mobile' ? [1, 1.2] : [1, 1.5]}
        performance={{ min: 0.3, max: 1.0 }}
      >
        <SceneErrorBoundary>
          <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={45} />
          
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[100, 100, 100]} intensity={0.5} />
          
          <StarField count={
            networkQuality === '4g' ? quality.starCount :
            networkQuality === '3g' ? Math.min(2000, quality.starCount) :
            Math.min(800, quality.starCount)
          } />
          
          <group onClick={handleBlackHoleClick}>
            <BlackHole isPaused={isPaused} />
          </group>
          
          <SolarSystem isPaused={isPaused} density={quality.particleDensity} />

          <CameraRig />
          
          {children}

          {quality.postprocessingEnabled && (
            <EffectComposer>
              <Bloom 
                luminanceThreshold={0.2} 
                mipmapBlur 
                intensity={0.8} 
                radius={0.2}
              />
              <ChromaticAberration
                blendFunction={BlendFunction.SCREEN}
                offset={new THREE.Vector2(0.001, 0.001)}
                radialModulation={false}
                modulationOffset={0}
              />
              <Noise opacity={0.02} />
              <Vignette eskil={false} offset={0.1} darkness={1.3} />
            </EffectComposer>
          )}
          
          {/* Internal frame recording for adaptive quality */}
          <FrameRecorder onFrame={quality.recordFrame} />
        </Suspense>
        </SceneErrorBoundary>
      </Canvas>
    </div>
  )
}
