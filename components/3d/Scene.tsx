"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useCallback, useEffect, useMemo } from "react"
import { PerspectiveCamera } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import CameraRig from "./CameraRig"
import BlackHole from "./BlackHole"
import SolarSystem from "./SolarSystem"
import StarField from "./StarField"

interface SceneProps {
  children?: React.ReactNode
}

export default function Scene({ children }: SceneProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleBlackHoleClick = useCallback(() => {
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000) // Resume after 3 seconds
  }, [])

  return (
    <div className="fixed inset-0 z-0 bg-[#020205]">
      <Canvas
        shadows
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: true
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={45} />
          
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[100, 100, 100]} intensity={0.5} />
          
          <StarField count={isMobile ? 1500 : 5000} />
          
          <group onClick={handleBlackHoleClick}>
            <BlackHole isPaused={isPaused} />
          </group>
          
          <SolarSystem isPaused={isPaused} />

          <CameraRig />
          
          {children}

          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={1.2} 
              radius={0.3}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.SCREEN}
              offset={[0.001, 0.001]}
            />
            <Noise opacity={0.03} />
            < Vignette eskil={false} offset={0.1} darkness={1.3} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
