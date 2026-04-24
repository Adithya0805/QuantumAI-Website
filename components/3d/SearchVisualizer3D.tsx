"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface SearchVisualizer3DProps {
  status: "idle" | "classical" | "quantum" | "found"
  targetIndex: number
  gridSize?: number
  position?: [number, number, number]
  onFound?: () => void
}

export default function SearchVisualizer3D({ 
  status, 
  targetIndex, 
  gridSize = 16,
  position = [0, 0, 0],
  onFound 
}: SearchVisualizer3DProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const totalItems = gridSize * gridSize
  
  // State for animations
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quantumProgress, setQuantumProgress] = useState(0)
  
  const tempObject = useMemo(() => new THREE.Object3D(), [])
  const tempColor = useMemo(() => new THREE.Color(), [])

  // Reset logic
  useEffect(() => {
    if (status === "idle") {
      setCurrentIndex(0)
      setQuantumProgress(0)
    }
  }, [status])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Classical Animation Loop
    if (status === "classical") {
      // Speed up classical search so it doesn't take forever, but looks sequential
      const step = Math.floor(totalItems * delta * 2) // Check ~2 items per frame at 60fps
      let newIndex = currentIndex + step
      
      if (newIndex >= targetIndex) {
        newIndex = targetIndex
        if (onFound) onFound()
      } else {
        setCurrentIndex(newIndex)
      }
    }

    // Quantum Animation Loop
    if (status === "quantum") {
      // Quantum search is O(sqrt(N)). We animate a rising wave that peaks at target.
      const newProgress = Math.min(1, quantumProgress + delta * 0.5)
      setQuantumProgress(newProgress)
      if (newProgress >= 1 && onFound) {
        onFound()
      }
    }

    // Update instance colors and positions
    const time = state.clock.getElapsedTime()
    
    for (let i = 0; i < totalItems; i++) {
      const x = (i % gridSize) - gridSize / 2 + 0.5
      const y = 0
      const z = Math.floor(i / gridSize) - gridSize / 2 + 0.5
      
      let scale = 0.8
      let r = 0.1, g = 0.1, b = 0.2 // Base dark color

      if (status === "classical") {
        if (i === targetIndex && currentIndex >= targetIndex) {
          // Found!
          r = 0; g = 1; b = 0.5; scale = 1.2
        } else if (i < currentIndex) {
          // Checked
          r = 0.5; g = 0.1; b = 0.1; scale = 0.6
        } else if (i === currentIndex) {
          // Currently checking
          r = 1; g = 0.2; b = 0.2; scale = 1.5
        }
      } 
      else if (status === "quantum" || (status === "found" && quantumProgress >= 1)) {
        if (quantumProgress >= 1 && i === targetIndex) {
          // Found!
          r = 0; g = 1; b = 1; scale = 1.5
        } else if (quantumProgress < 1) {
          // Grover's Amplitude Amplification Wave
          const dist = new THREE.Vector2(x, z).distanceTo(
            new THREE.Vector2((targetIndex % gridSize) - gridSize/2 + 0.5, Math.floor(targetIndex / gridSize) - gridSize/2 + 0.5)
          )
          
          // Probability amplitude visualizing
          const wave = Math.sin(dist * 0.5 - time * 5) * 0.5 + 0.5
          
          if (i === targetIndex) {
            // Target amplitude growing
            b = 0.5 + quantumProgress * 0.5
            g = quantumProgress
            scale = 0.8 + quantumProgress * 0.7
          } else {
            // Other amplitudes shrinking (interference)
            b = 0.3 * wave * (1 - quantumProgress)
            scale = 0.8 * (1 - quantumProgress * 0.5)
          }
        } else {
          // Collapsed state (not target)
          r = 0.05; g = 0.05; b = 0.1; scale = 0.5
        }
      }
      else if (status === "found") {
        if (i === targetIndex) {
           r = 0; g = 1; b = 1; scale = 1.5
        } else {
           r = 0.1; g = 0.1; b = 0.2; scale = 0.5
        }
      }

      // Add a subtle idle breathing to all cubes if idle
      if (status === "idle") {
        scale += Math.sin(x * 0.5 + z * 0.5 + time) * 0.1
      }

      tempObject.position.set(x, y, z)
      tempObject.scale.set(scale, scale, scale)
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
      
      tempColor.setRGB(r, g, b)
      meshRef.current.setColorAt(i, tempColor)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <group position={position} rotation={[Math.PI * 0.15, Math.PI / 4, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, totalItems]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshPhysicalMaterial 
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
          transmission={0.5} // Glass-like
          thickness={0.5}
        />
      </instancedMesh>
      
      {/* Grid Floor */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[gridSize + 2, gridSize + 2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}
