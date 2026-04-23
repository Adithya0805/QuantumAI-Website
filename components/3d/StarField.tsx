"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const DEFAULT_STAR_COUNT = 5000

export default function StarField({ count = DEFAULT_STAR_COUNT }) {
  const points = useRef<THREE.Points>(null!)
  const [scale, setScale] = useState(1)
  const lastTapTime = useRef(0)

  // Generate star positions
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Sphere distribution for a more immersive feel
      const r = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      
      sz[i] = Math.random() * 0.15
    }
    return [pos, sz]
  }, [count])

  // Double tap to toggle scale
  useEffect(() => {
    const handleDoubleTap = () => {
      const now = Date.now()
      if (now - lastTapTime.current < 300) {
        setScale(prev => (prev === 1 ? 2.5 : 1))
      }
      lastTapTime.current = now
    }

    window.addEventListener("click", handleDoubleTap)
    return () => window.removeEventListener("click", handleDoubleTap)
  }, [])

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.0001
      points.current.rotation.x += 0.00005
      
      // Smoothly animate scale transition
      const targetScale = scale
      points.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
