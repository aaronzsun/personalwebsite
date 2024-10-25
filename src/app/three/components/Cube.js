'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Box } from '@react-three/drei';  // Import Box for the cube
import { useSpring, animated } from '@react-spring/three';  // Import useSpring for animation

const Cube = () => {
  const cubeRef = useRef();
  const [isMobile, setIsMobile] = useState(false);  // Track whether we're on mobile

  const cobbleTexture = useLoader(TextureLoader, '/cobbletexture.png');  // Replace with the path to your Earth texture image


  // Scroll handler to rotate the cube

  // Check screen size and update isMobile state
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);  // Mobile screen
      } else {
        setIsMobile(false);  // Desktop screen
      }
    };

    updateScreenSize();  // Initial check
    window.addEventListener('resize', updateScreenSize);  // Update on resize
    return () => window.removeEventListener('resize', updateScreenSize);  // Cleanup
  }, []);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.PI / 8;  // Set an initial downward tilt (22.5 degrees)
    }
  }, []);

  // Define the position spring using react-spring based on whether it's mobile or desktop
  const { position: springPosition } = useSpring({
    position: isMobile ? [0, 0, 0] : [1, 0.5, 0],  // Mobile or desktop position
    config: { mass: 1, tension: 280, friction: 60 },  // Adjust the spring configuration for smoothness
  });

  // Animate the cube independently
  useFrame(() => {
    if (cubeRef.current) {
      // Set the rotation based directly on the scroll position
      cubeRef.current.rotation.y += 0.005;  // Adjust the factor for the desired speed
      cubeRef.current.rotation.x += 0.005;
    }
  });

  return (
    <group>
      {/* The cube with animated position */}
      <animated.group position={springPosition}>
        <Box ref={cubeRef} args={[1.8, 1.8, 1.8]}>
          <meshStandardMaterial map={cobbleTexture} />
        </Box>
      </animated.group>
    </group>
  );
};

export default Cube;
