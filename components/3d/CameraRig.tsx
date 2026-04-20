"use client"

import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export default function CameraRig() {
  const { mouse } = useThree()

  useFrame((state) => {
    // Mouse Parallax effect
    const parallaxX = mouse.x * 2
    const parallaxY = mouse.y * 2
    
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      parallaxX,
      0.1
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      parallaxY,
      0.1
    )
    
    state.camera.lookAt(0, 0, 0)
  })

  return null
}
