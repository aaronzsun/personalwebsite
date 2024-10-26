import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera, Box, Sphere } from '@react-three/drei'
import Dinosaurs from './Dinosaurs'

// Custom rotating camera component
const RotatingCamera = ({ centerPosition, radius = 50, height = 15, speed = 0.05 }) => {
  const cameraRef = useRef()

  useFrame(({ clock }) => {
    if (cameraRef.current) {
      const t = clock.getElapsedTime() * speed
      cameraRef.current.position.x = centerPosition[0] + Math.sin(t) * radius
      cameraRef.current.position.z = centerPosition[2] + Math.cos(t) * radius
      cameraRef.current.position.y = height
      cameraRef.current.lookAt(...centerPosition)
    }
  })

  return <OrthographicCamera makeDefault ref={cameraRef} zoom={10} near={0.1} far={1000} />
}

// Disco floor component with animated colors
const DiscoFloor = () => {
  const rows = 16 // Increase for a bigger floor
  const cols = 16
  const tileSize = 4.4
  const tilesRef = useRef([])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 2
    tilesRef.current.forEach((tile, index) => {
      if (tile) {
        const colorOffset = index * 10
        tile.material.color.setHSL((time * 10 + colorOffset) % 360 / 360, 1, 0.5)
      }
    })
  })

  return (
    <group position={[25, -5.8, 0]} rotation={[0, Math.PI / 4, 0]}>
      {Array.from({ length: rows }).map((_, rowIdx) =>
        Array.from({ length: cols }).map((_, colIdx) => (
          <Box
            key={`${rowIdx}-${colIdx}`}
            args={[tileSize, 0.1, tileSize]} // Flat square tile
            position={[
              (colIdx - cols / 2) * tileSize,
              0,
              (rowIdx - rows / 2) * tileSize,
            ]}
            ref={(ref) => (tilesRef.current[rowIdx * cols + colIdx] = ref)}
          >
            <meshStandardMaterial opacity={0.8} transparent />
          </Box>
        ))
      )}
    </group>
  )
}

const DiscoBall = () => {
    const ballRef = useRef()
    const lightRef1 = useRef()
    const lightRef2 = useRef()
  
    // Rotate the disco ball and lights
    useFrame(({ clock }) => {
      if (ballRef.current) {
        ballRef.current.rotation.y += 0.2 // Rotate the disco ball
      }
      const angle = clock.getElapsedTime()
      if (lightRef1.current && lightRef2.current) {
        lightRef1.current.position.set(15 * Math.sin(angle), 20, 15 * Math.cos(angle))
        lightRef2.current.position.set(15 * Math.sin(angle + Math.PI), 20, 15 * Math.cos(angle + Math.PI))
      }
    })
  
    return (
      <>
        <Sphere ref={ballRef} args={[3, 32, 32]} position={[25, 24, 0]}>
            <meshStandardMaterial
            color="#d3d3d3"          // Light gray for base color
            metalness={1}            // High metalness for reflective surface
            roughness={0.2}          // Slight roughness to keep the ball reflective but not too shiny
            emissive="#aaaaaa"       // Soft light gray for subtle glow
            emissiveIntensity={0.042}  // Reduced intensity for a gentle glow
            />
        </Sphere>
        <spotLight 
            ref={lightRef1} 
            position={[25, 25, 5]} 
            intensity={1000} // Increase brightness
            angle={0.3} // Widen light spread
            penumbra={100} // Soften edges
            castShadow 
            color="cyan" 
        />
        <spotLight 
            ref={lightRef2} 
            position={[25, 25, -5]} 
            intensity={1000} // Increase brightness
            angle={0.3} // Widen light spread
            penumbra={100} // Soften edges
            castShadow 
            color="magenta" 
        />
      </>
    )
};

const DinoRave = () => {
  const centerPosition = [25, -5, 0] // Centered for dinosaurs and disco floor alignment

  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
      resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
      shadows
    >
      <RotatingCamera centerPosition={centerPosition} radius={50} height={15} speed={0.25} />

      <ambientLight intensity={10} />
      <pointLight position={[25, -5, 10]}/>

      <DiscoBall/>

      {/* Disco Floor */}
      <DiscoFloor receiveShadow/>

      <group position={[0, -5, 0]}>
        <Dinosaurs castShadow />
      </group>
    </Canvas>
  )
}

export default DinoRave
