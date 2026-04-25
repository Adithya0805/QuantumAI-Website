"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Line, Text, Sphere } from "@react-three/drei"

interface QubitSimulatorProps {
  targetTheta: number // 0 to Math.PI
  targetPhi: number   // 0 to 2 * Math.PI
}

export default function QubitSimulator({ targetTheta, targetPhi }: QubitSimulatorProps) {
  const arrowRef = useRef<THREE.Group>(null)
  
  // Current interpolated values
  const currentTheta = useRef(targetTheta)
  const currentPhi = useRef(targetPhi)

  // Smoothly interpolate the state vector to the target angles
  useFrame((state, delta) => {
    if (!arrowRef.current) return

    // Lerp angles for smooth animation
    currentTheta.current = THREE.MathUtils.lerp(currentTheta.current, targetTheta, delta * 3)
    
    // Handle phi wraparound for smoother shortest-path interpolation
    let dPhi = targetPhi - currentPhi.current
    if (dPhi > Math.PI) dPhi -= 2 * Math.PI
    if (dPhi < -Math.PI) dPhi += 2 * Math.PI
    currentPhi.current += dPhi * delta * 3

    // Convert spherical coordinates to cartesian for the arrow direction
    const radius = 2
    const x = radius * Math.sin(currentTheta.current) * Math.cos(currentPhi.current)
    const y = radius * Math.cos(currentTheta.current)
    const z = radius * Math.sin(currentTheta.current) * Math.sin(currentPhi.current)

    // Calculate rotation to point arrow at the target cartesian coordinate
    // The arrow defaults to pointing UP (Y axis) in our construction
    const targetVector = new THREE.Vector3(x, y, z).normalize()
    const upVector = new THREE.Vector3(0, 1, 0)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(upVector, targetVector)
    
    arrowRef.current.quaternion.copy(quaternion)
  })

  // Pre-calculate axis lines
  const axisLength = 2.5
  const xAxis = useMemo(() => [new THREE.Vector3(-axisLength, 0, 0), new THREE.Vector3(axisLength, 0, 0)], [])
  const yAxis = useMemo(() => [new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0)], [])
  const zAxis = useMemo(() => [new THREE.Vector3(0, 0, -axisLength), new THREE.Vector3(0, 0, axisLength)], [])

  return (
    <group>
      {/* The Bloch Sphere itself */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#00f0ff"
          transparent
          opacity={0.2}
          roughness={0.3}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Grid / Equator */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.98, 2.02, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Axes */}
      <Line points={xAxis} color="#ffffff" opacity={0.2} transparent lineWidth={1} />
      <Line points={yAxis} color="#ffffff" opacity={0.2} transparent lineWidth={1} />
      <Line points={zAxis} color="#ffffff" opacity={0.2} transparent lineWidth={1} />

      {/* Axis Labels */}
      <Text position={[axisLength + 0.2, 0, 0]} color="#ffffff" fontSize={0.2} opacity={0.5}>X</Text>
      <Text position={[0, axisLength + 0.2, 0]} color="#ffffff" fontSize={0.2} opacity={0.5}>|0⟩ (Z)</Text>
      <Text position={[0, -axisLength - 0.2, 0]} color="#ffffff" fontSize={0.2} opacity={0.5}>|1⟩ (-Z)</Text>

      {/* The State Vector (Arrow) */}
      <group ref={arrowRef}>
        {/* Shaft */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 2, 0]}>
          <coneGeometry args={[0.1, 0.2, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>
    </group>
  )
}
