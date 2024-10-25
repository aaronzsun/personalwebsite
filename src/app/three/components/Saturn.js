'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import { TextureLoader, Color, AdditiveBlending } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Function to interpolate between two colors
const interpolateColor = (startColor, endColor, factor) => {
  const color1 = new Color(startColor);
  const color2 = new Color(endColor);
  return color1.lerp(color2, factor);
};

const Saturn = () => {
  const saturnRef = useRef();
  const ringsRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Load Saturn texture
  const saturnTexture = useLoader(TextureLoader, '/saturn.jpg');  // Replace with your Saturn texture path

  useEffect(() => {
    // Update screen size and isMobile state
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Define the position spring based on screen size (mobile or desktop)
  const { position: springPosition } = useSpring({
    position: isMobile ? [0, 0, 0] : [1, 0.5, 0],  // Mobile or desktop position
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // Rotate Saturn and its rings
  useFrame(() => {
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.0035;  // Slow rotation for Saturn
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = 0.5;  // Fixed tilt for rings
      ringsRef.current.rotation.x += 0.0008;  // Very subtle rotation for rings
    }
  });

  return (
    <>
      <group>
        {/* Enlarged Saturn with animated position */}
        <animated.group ref={saturnRef} position={springPosition}>
          <Sphere args={isMobile ? [0.55, 64, 64] : [0.7, 64, 64]} rotation={[0.3, 0.2, 0]}>
            <meshStandardMaterial
              map={saturnTexture}
              emissive={'#F3DF6C'}  // Soft yellow glow for brightness
              emissiveIntensity={0.125}  // Adjust brightness intensity
            />
          </Sphere>

          {/* Gradient-effect rings using multiple overlapping Torus components */}
          <group ref={ringsRef} rotation={[0.5, 0, 0]}>
            {Array.from({ length: 40 }).map((_, i) => {
              // Dynamically set radius with a smaller increment of 0.015
              const baseRadius = isMobile ? 0.8 : 1.0;
              const radiusIncrement = 0.015;
              const radius = baseRadius + i * radiusIncrement;

              // Opacity calculation: fade out in the middle, high opacity at start and end
              const midPoint = 20; // Middle index in a 40-ring setup
              const opacity = i <= midPoint ? 0.7 - i * 0.02 : 0.7 - (39 - i) * 0.02;

              const color = interpolateColor('#FFEDB3', '#FFFFE0', i / 39);  // Slightly more yellow start color

              return (
                <Torus
                  key={i}
                  args={[radius, 0.02, 16, 100]}
                >
                  <meshStandardMaterial
                    color={color}
                    opacity={opacity}
                    transparent={true}
                    blending={AdditiveBlending}
                  />
                </Torus>
              );
            })}
          </group>
        </animated.group>
      </group>

      {/* Subtler Bloom effect for the whole scene */}
      <EffectComposer>
        <Bloom intensity={0.33} luminanceThreshold={0.5} luminanceSmoothing={0.85} />
      </EffectComposer>
    </>
  );
};

export default Saturn;
