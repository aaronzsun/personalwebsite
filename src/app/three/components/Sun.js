'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Sun = () => {
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

  // Position spring for responsive behavior
  const { position: springPosition } = useSpring({
    position: isMobile ? [0, 0, 0] : [-1, 0.5, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

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
        <animated.group position={springPosition}>
          {/* Core Sun */}
          <Sphere ref={sunRef} args={isMobile ? [1, 64, 64] : [1.6, 64, 64]}>
            <meshBasicMaterial map={sunTexture} />
          </Sphere>

          {/* Point light to emit sunlight onto nearby objects */}
          <pointLight 
            position={[0, 0, 0]}  // Centered on the Sun's position
            intensity={5}          // Higher intensity for sunlight effect
            color={'#FFA500'}      // Orange-yellow color for sunlight
            distance={50}          // Determines how far the light reaches
            decay={2}              // Controls how quickly the light dims
          />
        </animated.group>
      </group>

      {/* Bloom effect for realistic glowing effect */}
      <EffectComposer>
        <Bloom intensity={3.5} luminanceThreshold={0.1} luminanceSmoothing={0.5} />
      </EffectComposer>
    </>
  );
};

export default Sun;
