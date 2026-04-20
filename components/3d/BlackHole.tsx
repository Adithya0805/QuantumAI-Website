"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"

// Custom Shader for the Accretion Disk
const AccretionDiskMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#FF6B00"),
    uSecondaryColor: new THREE.Color("#FFFFFF"),
    uNoiseScale: 1.5,
  },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uSecondaryColor;
  uniform float uNoiseScale;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 centeredUv = vUv - 0.5;
    float dist = length(centeredUv);
    
    // Circular disk mask
    if (dist > 0.5 || dist < 0.15) discard;

    // Spiral pattern
    float angle = atan(centeredUv.y, centeredUv.x);
    float spiral = sin(angle * 5.0 + dist * 20.0 - uTime * 2.0);
    
    // Gradient and heat intensity
    float intensity = (0.5 - dist) * 2.0;
    intensity *= (0.8 + 0.2 * spiral);
    
    vec3 color = mix(uColor, uSecondaryColor, spiral * 0.5 + 0.5);
    gl_FragColor = vec4(color, intensity * 0.8);
  }
  `
)

extend({ AccretionDiskMaterial })

export default function BlackHole({ isPaused = false }) {
  const diskRef = useRef<THREE.Mesh>(null!)
  const eventHorizonRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (!isPaused && diskRef.current) {
      // Disk rotation and time update
      diskRef.current.rotation.z += delta * 0.5
      // @ts-ignore
      diskRef.current.material.uTime = state.clock.elapsedTime
    }
    
    // Pulsing effect for event horizon
    if (eventHorizonRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      eventHorizonRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group>
      {/* Event Horizon (Pure Black Hole) */}
      <mesh ref={eventHorizonRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Glow / Einstein Ring (Inner) */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.15} />
      </mesh>

      {/* Accretion Disk */}
      <mesh ref={diskRef} rotation={[-Math.PI / 2.5, 0, 0]}>
        <planeGeometry args={[10, 10, 32, 32]} />
        {/* @ts-ignore */}
        <accretionDiskMaterial transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      
      {/* Outer Glow */}
      <pointLight intensity={3} distance={15} color="#FF6B00" />
    </group>
  )
}
