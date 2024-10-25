'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';

const SSUranus = () => {
  const uranusRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Load the Mercury texture
  const uranusTexture = useLoader(TextureLoader, '/uranus.jpg'); // Replace with the correct path to your Mercury texture

  // Update mobile status based on screen width
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    updateScreenSize(); // Initial check
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize); // Cleanup on unmount
  }, []);


  // Auto-rotate the Mercury sphere
  useFrame(() => {
    if (uranusRef.current) {
        uranusRef.current.rotation.y += 0.005; // Adjust speed for the rotation effect
    }
  });

  return (
    <group>
      {/* Mercury sphere with animated position and texture */}
      <group position={[0, 0, 0]}>
        <Sphere ref={uranusRef} args={isMobile ? [0.35, 64, 64] : [0.6, 64, 64]}>
          <meshStandardMaterial map={uranusTexture} />
        </Sphere>
      </group>
    </group>
  );
};

export default SSUranus;
