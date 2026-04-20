"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const COUNT = 1000

export default function CircuitBoard() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const tempObject = useMemo(() => new THREE.Object3D(), [])
  const baseColor = useMemo(() => new THREE.Color("#00F0FF"), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      const length = Math.random() * 5 + 1
      const vertical = Math.random() > 0.5
      const speed = Math.random() * 0.1 + 0.02
      temp.push({ x, z, length, vertical, speed, offset: Math.random() * Math.PI * 2 })
    }
    return temp
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    particles.forEach((p, i) => {
      tempObject.position.set(p.x, -0.2, p.z)
      
      const s = Math.sin(time * p.speed + p.offset) * 0.5 + 0.5
      tempObject.scale.set(
        p.vertical ? 0.05 : p.length * s,
        0.01,
        p.vertical ? p.length * s : 0.05
      )
      
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
      
      // Update color based on pulse
      const glow = Math.sin(time * 2 + p.offset) * 0.5 + 0.5
      meshRef.current.setColorAt(i, baseColor.clone().multiplyScalar(glow * 2))
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return (
    <group position={[0, -2, 0]} rotation={[-Math.PI / 12, 0, 0]}>
      <instancedMesh ref={meshRef} args={[new THREE.BoxGeometry(1, 1, 1), undefined, COUNT]}>
        <meshStandardMaterial 
          emissive="#00F0FF" 
          emissiveIntensity={1} 
          transparent 
          opacity={0.3} 
        />
      </instancedMesh>
      
      {/* Dark Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050508" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}
