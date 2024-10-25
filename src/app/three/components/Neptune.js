'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useSpring, animated } from '@react-spring/three';

const Neptune = () => {
  const neptuneRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Load the Mercury texture
  const neptuneTexture = useLoader(TextureLoader, '/neptune.jpg'); // Replace with the correct path to your Mercury texture

  // Update mobile status based on screen width
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    updateScreenSize(); // Initial check
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize); // Cleanup on unmount
  }, []);

  // Define the position spring using react-spring based on whether it's mobile or desktop
  const { position: springPosition } = useSpring({
    position: isMobile ? [0, 0, 0] : [-1, 0.5, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Auto-rotate the Mercury sphere
  useFrame(() => {
    if (neptuneRef.current) {
      neptuneRef.current.rotation.y += 0.005; // Adjust speed for the rotation effect
    }
  });

  return (
    <group>
      {/* Mercury sphere with animated position and texture */}
      <animated.group position={springPosition}>
        <Sphere ref={neptuneRef} args={isMobile ? [0.85, 64, 64] : [1.3, 64, 64]}>
          <meshStandardMaterial map={neptuneTexture} />
        </Sphere>
      </animated.group>
    </group>
  );
};

export default Neptune;
