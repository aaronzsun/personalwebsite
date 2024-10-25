'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const SSSun = () => {
  const sunRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Load a fiery texture for the Sun
  const sunTexture = useLoader(TextureLoader, '/suntexture.jpg');  // Replace with your fiery Sun texture path

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
  // Animation effect for Sun’s texture
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;  // Slow rotation for animated texture effect
    }
  });

  return (
    <>
      <group>
        {/* Glowing Sun sphere with animated position */}
        <group position={[0, 0, 0]}>
          {/* Core Sun */}
          <Sphere ref={sunRef} args={isMobile ? [1.2, 64, 64] : [2.5, 64, 64]}>
            <meshBasicMaterial map={sunTexture} />
          </Sphere>

          {/* Point light to emit sunlight onto nearby objects */}
          <pointLight 
            position={[0, 0, 0]}  // Centered on the Sun's position
            intensity={10}         // Increased intensity for a stronger sunlight effect
            color={'#FFA500'}      // Orange-yellow color for sunlight
            distance={100}          // Extends the reach of the light
            decay={2}              // Controls how quickly the light dims
          />
        </group>
      </group>

      {/* Bloom effect for realistic glowing effect */}
      <EffectComposer>
        <Bloom intensity={10} luminanceThreshold={0.05} luminanceSmoothing={0.2} />
      </EffectComposer>
    </>
  );
};

export default SSSun;
