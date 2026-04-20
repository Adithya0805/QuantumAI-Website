"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 500

export default function EnergyParticles() {
  const points = useRef<THREE.Points>(null!)
  const { mouse } = useThree()

  const [positions, sizes, initialPositions] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const sz = new Float32Array(PARTICLE_COUNT)
    const initial = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 30
      
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      
      initial[i * 3] = x
      initial[i * 3 + 1] = y
      initial[i * 3 + 2] = z
      
      sz[i] = Math.random() * 0.1 + 0.05
    }
    return [pos, sz, initial]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const posAttribute = points.current.geometry.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      // Floating animation
      posAttribute.array[ix] = initialPositions[ix] + Math.sin(time * 0.5 + initialPositions[iz]) * 0.5
      posAttribute.array[iy] = initialPositions[iy] + Math.cos(time * 0.5 + initialPositions[ix]) * 0.5
      posAttribute.array[iz] = initialPositions[iz] + Math.sin(time * 0.3 + initialPositions[iy]) * 1.0

      // Mouse repulsion
      const dist = Math.sqrt(
        Math.pow(posAttribute.array[ix] - mouse.x * 10, 2) +
        Math.pow(posAttribute.array[iy] - mouse.y * 10, 2)
      )

      if (dist < 3) {
        const force = (3 - dist) * 0.1
        posAttribute.array[ix] += (posAttribute.array[ix] - mouse.x * 10) * force
        posAttribute.array[iy] += (posAttribute.array[iy] - mouse.y * 10) * force
      }
    }
    
    posAttribute.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00F0FF"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
