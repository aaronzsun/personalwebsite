"use client"

import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Box, Sphere } from '@react-three/drei'
import { TextureLoader } from 'three';

import Dinosaurs from './Dinosaurs'


// Disco floor component with animated colors
const DiscoFloor = () => {
  const rows = 18 // Increase for a bigger floor
  const cols = 18
  const tileSize = 4.4
  const tilesRef = useRef([])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    tilesRef.current.forEach((tile, index) => {
      if (tile) {
        // Apply a slower and staggered color change effect
        const row = Math.floor(index / cols);
        const col = index % cols;
        const colorOffset = (row + col) * 0.1; // Smaller offset to slow down
        const randomHue = (time * 0.5 + colorOffset) % 1; // Reduced speed with time * 0.5
        tile.material.color.setHSL(randomHue, 1, 0.5);
      }
    });
  });

  return (
    <group position={[1, -5.8, 0]} rotation={[0, Math.PI / 4, 0]}>
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
    const ballRef = useRef();
    const lightRef1 = useRef();
    const lightRef2 = useRef();
  
    const discoTexture = useLoader(TextureLoader, '/discoball.jpeg');
  
    useFrame(({ clock }) => {
      const time = clock.getElapsedTime();
      const colorCycleSpeed = 0.1; // Controls the color transition speed for the ball
      const hue = (time * colorCycleSpeed) % 1; // Generates a normalized hue value
  
      // Rotate the disco ball and set dynamic emissive color
      if (ballRef.current) {
        ballRef.current.rotation.y += 0.04;
        ballRef.current.material.emissive.setHSL(hue, 1, 0.3); // Sync with spotlight hue
        ballRef.current.material.emissiveIntensity = 0.9; // Increase emissive intensity for glow effect
      }
  
      if (lightRef1.current && lightRef2.current) {
        lightRef1.current.position.set(15 * Math.sin(time), 20, 15 * Math.cos(time));
        lightRef2.current.position.set(15 * Math.sin(time + Math.PI), 20, 15 * Math.cos(time + Math.PI));
  
        // Apply the same hue to both spotlights
        lightRef1.current.color.setHSL(hue, 1, 0.5);
        lightRef2.current.color.setHSL(hue, 1, 0.5);
      }
    });
  
    return (
    <>
    <ambientLight intensity={10} />
    <pointLight position={[0, 50, 50]} intensity={1} />

    <Sphere ref={ballRef} args={[3, 32, 32]} position={[0, 24, 0]}>
        <meshStandardMaterial
        map={discoTexture}
        metalness={0.95}
        roughness={0.2}
        emissiveIntensity={0.6}
        />
    </Sphere>
    <spotLight
        ref={lightRef1}
        position={[0, 25, 0]}
        intensity={1000}
        angle={0.8}
        penumbra={0.5}
        castShadow
    />
    <spotLight
        ref={lightRef2}
        position={[0, 25, 0]}
        intensity={1000}
        angle={0.8}
        penumbra={0.5}
        castShadow
    />
    </>
);
};
  

const DinoRave = () => {

  return (
    <>
      <ambientLight intensity={10} />
      <pointLight position={[0, -5, 10]}/>

      <DiscoBall/>

      {/* Disco Floor */}
      <DiscoFloor receiveShadow/>

      <group position={[0, -5, 0]}>
        <Dinosaurs castShadow />
      </group>
    </>
  )
}

export default DinoRave
