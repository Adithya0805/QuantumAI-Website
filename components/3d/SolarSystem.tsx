"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface PlanetData {
  name: string
  distance: number
  size: number
  speed: number
  color: string
}

const PLANETS: PlanetData[] = [
  { name: "Mercury", distance: 4, size: 0.1, speed: 1.5, color: "#888888" },
  { name: "Venus", distance: 6, size: 0.25, speed: 1.1, color: "#E3BB76" },
  { name: "Earth", distance: 8, size: 0.27, speed: 1.0, color: "#2271B3" },
  { name: "Mars", distance: 10, size: 0.15, speed: 0.8, color: "#E27B58" },
  { name: "Jupiter", distance: 14, size: 0.6, speed: 0.4, color: "#D39C7E" },
  { name: "Saturn", distance: 18, size: 0.5, speed: 0.3, color: "#C5AB6E" },
  { name: "Uranus", distance: 22, size: 0.35, speed: 0.2, color: "#BBE1E4" },
  { name: "Neptune", distance: 26, size: 0.34, speed: 0.1, color: "#6081FF" },
]

export default function SolarSystem({ isPaused = false, density = 1.0 }) {
  const planetRefs = useRef<THREE.Group[]>([])

  useFrame((state, delta) => {
    if (isPaused) return

    PLANETS.forEach((planet, i) => {
      if (planetRefs.current[i]) {
        // Orbit rotation
        planetRefs.current[i].rotation.y += delta * planet.speed * 0.5
      }
    })
  })

  const visiblePlanets = PLANETS.slice(0, Math.ceil(PLANETS.length * density))

  return (
    <group>
      {visiblePlanets.map((planet, i) => (
        <group 
          key={planet.name} 
          ref={(el) => { if (el) planetRefs.current[i] = el }}
        >
          {/* Planet Mesh */}
          <mesh position={[planet.distance, 0, 0]}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshStandardMaterial 
              color={planet.color} 
              emissive={planet.color}
              emissiveIntensity={0.2}
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
          
          {/* Orbit Path Link (Subtle) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.distance - 0.02, planet.distance + 0.02, 128]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
