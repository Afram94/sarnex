'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 0, 5]} />
        <RotatingSphere />
        <AnimatedArcs />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

function RotatingSphere() {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#00ffcc" wireframe opacity={0.15} transparent />
    </mesh>
  )
}

function AnimatedArcs() {
  const groupRef = useRef()

  const arcs = useMemo(() => {
    const data = []
    const count = 30
    const radius = 2.5

    for (let i = 0; i < count; i++) {
      const theta1 = Math.random() * 2 * Math.PI
      const phi1 = Math.random() * Math.PI / 1.6

      const theta2 = Math.random() * 2 * Math.PI
      const phi2 = Math.random() * Math.PI / 1.6

      const p1 = new THREE.Vector3(
        radius * Math.sin(phi1) * Math.cos(theta1),
        radius * Math.cos(phi1),
        radius * Math.sin(phi1) * Math.sin(theta1)
      )

      const p2 = new THREE.Vector3(
        radius * Math.sin(phi2) * Math.cos(theta2),
        radius * Math.cos(phi2),
        radius * Math.sin(phi2) * Math.sin(theta2)
      )

      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.3)
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const points = curve.getPoints(60)

      data.push({ curve, points, progress: Math.random() })
    }

    return data
  }, [])

  useFrame((_, delta) => {
    groupRef.current.children.forEach((group, idx) => {
      const arc = arcs[idx]
      arc.progress += delta * 0.3
      if (arc.progress > 1) arc.progress = 0

      const trailDot = group.children.find((c) => c.name === 'trail')
      const point = arc.curve.getPoint(arc.progress)
      trailDot.position.copy(point)
    })
  })

  return (
    <group ref={groupRef}>
      {arcs.map(({ points, curve }, idx) => {
        const positionArray = new Float32Array(points.length * 3)
        for (let i = 0; i < points.length; i++) {
          positionArray[i * 3] = points[i].x
          positionArray[i * 3 + 1] = points[i].y
          positionArray[i * 3 + 2] = points[i].z
        }

        const color = new THREE.Color('#00ffcc')

        return (
          <group key={idx}>
            {/* Curved Arc Line */}
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  array={positionArray}
                  itemSize={3}
                  count={positionArray.length / 3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={color}
                transparent
                opacity={0.3}
                linewidth={1}
              />
            </line>

            {/* Moving Trail Dot */}
            <mesh name="trail">
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial
                emissive={color}
                emissiveIntensity={2}
                color={color}
                toneMapped={false}
              />
            </mesh>

            {/* Pulsing Start Dot */}
            <mesh position={curve.getPoint(0)}>
              <sphereGeometry args={[0.025, 10, 10]} />
              <meshStandardMaterial
                emissive="#00ffaa"
                emissiveIntensity={0.8}
                color="#00ffaa"
                toneMapped={false}
              />
            </mesh>

            {/* Pulsing End Dot */}
            <mesh position={curve.getPoint(1)}>
              <sphereGeometry args={[0.025, 10, 10]} />
              <meshStandardMaterial
                emissive="#00ffaa"
                emissiveIntensity={0.8}
                color="#00ffaa"
                toneMapped={false}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
