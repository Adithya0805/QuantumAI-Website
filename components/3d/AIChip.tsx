"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial, Float, Text } from "@react-three/drei"
import * as THREE from "three"

export default function AIChip() {
  const group = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)
  
  // Procedural geometry for the chip substrate
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.1
      group.current.rotation.x = Math.cos(t * 0.2) * 0.1
    }
    
    // Core pulse effect
    if (coreRef.current) {
      const coreMaterial = coreRef.current.material as THREE.MeshStandardMaterial
      coreMaterial.emissiveIntensity = 2 + Math.sin(t * 4) * 1.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={group} scale={1.5} rotation={[Math.PI / 6, -Math.PI / 12, 0]}>
        {/* Main Chip Substrate */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[4, 0.2, 4]} />
          <meshStandardMaterial color="#1a1a20" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Heat Spreader / Glass Layer */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[3.8, 0.1, 3.8]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color="#00F0FF"
            attenuationDistance={0.5}
            attenuationColor="#00F0FF"
          />
        </mesh>

        {/* The AI Core */}
        <mesh ref={coreRef} position={[0, 0.2, 0]}>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial 
            color="#00F0FF" 
            emissive="#00F0FF" 
            emissiveIntensity={2} 
            roughness={0}
          />
        </mesh>

        {/* Inner Logic Gates (Animated Lines) */}
        <LogicLines />

        {/* Tech Labels */}
        <Text
          position={[0, 0.22, 1.4]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.15}
          color="#A0A0B0"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t6nu27PSqS_SShTqV_X6m_R4B967S_k.woff"
        >
          QUANTUM NEURAL ENGINE v4.0
        </Text>
      </group>
    </Float>
  )
}

function LogicLines() {
  const lines = useMemo(() => {
    const list = []
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 3
      const z = (Math.random() - 0.5) * 3
      const length = Math.random() * 2 + 1
      list.push({ x, z, length, vertical: Math.random() > 0.5 })
    }
    return list
  }, [])

  return (
    <group position={[0, 0.11, 0]}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, 0, line.z]}>
          <boxGeometry args={[line.vertical ? 0.02 : line.length, 0.01, line.vertical ? line.length : 0.02]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}
