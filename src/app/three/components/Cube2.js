'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Box } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';


const Cube = () => {
  const cubeRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Load a different texture for each face of the cube
  const textures = [
    useLoader(TextureLoader, '/snow-side.jpg'),  // Front face
    useLoader(TextureLoader, '/snow-side.jpg'),  // Back face
    useLoader(TextureLoader, '/snow-top.jpg'),  // Top face
    useLoader(TextureLoader, '/snow-bottom.jpg'),  // Bottom face
    useLoader(TextureLoader, '/snow-side.jpg'),  // Left face
    useLoader(TextureLoader, '/snow-side.jpg'),  // Right face
  ];

  const materials = textures.map(texture => (
    new THREE.MeshStandardMaterial({
      map: texture,
      emissive: '#5e3803',       // Set a bright emissive color
      emissiveIntensity: 0.1,               // Adjust intensity for subtle glow
      roughness: 0.05,                       // Lower roughness for smoothness
      metalness: 0.05,                       // Increase metalness slightly
    })
  ));

  // Scroll handler to rotate the cube

  // Check screen size and update isMobile state
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.PI / 8;  // Set an initial downward tilt
    }
  }, []);

  // Define the position spring using react-spring based on whether it's mobile or desktop
  const { position: springPosition } = useSpring({
    position: isMobile ? [0, 0, 0] : [1, 0.5, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Animate the cube independently
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.005;
      cubeRef.current.rotation.x += 0.005;
    }
  });

  return (
    <group>
      {/* The cube with animated position */}
      <animated.group position={springPosition}>
        <Box ref={cubeRef} args={[1.8, 1.8, 1.8]} material={materials} />
      </animated.group>
    </group>
  );
};

export default Cube;
