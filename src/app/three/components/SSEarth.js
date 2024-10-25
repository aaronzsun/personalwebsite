'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// Component to render the orbiting dot with texture, rotation, and fade-in
const OrbitDot = ({ position, texturePath, size, opacity }) => {
  const dotRef = useRef();  // Ref for the dot's rotation
  const dotTexture = useLoader(TextureLoader, texturePath);

  // Rotate the dot around its own axis
  useFrame(() => {
    if (dotRef.current) {
      dotRef.current.rotation.y += 0.01;  // Adjust the speed of rotation here
    }
  });

  return (
    <Sphere ref={dotRef} position={position} args={[size, 16, 16]}>
      <meshStandardMaterial map={dotTexture} opacity={opacity} transparent={true} />
    </Sphere>
  );
};

const SSEarth = () => {
  const globeRef = useRef();
  const dotRef = useRef();  // Ref for the single orbiting dot
  const [isMobile, setIsMobile] = useState(false);  // Track whether we're on mobile
  const speed = 0.007;  // Orbit speed for the single dot
  const [dotAngle, setDotAngle] = useState(0);  // Angle for the orbiting dot
  const [opacity, setOpacity] = useState(0);  // Initial opacity for fade-in
  const [dotOpacity, setDotOpacity] = useState(0);  // Opacity for OrbitDot fade-in


  const earthTexture = useLoader(TextureLoader, '/earthtexture.jpg');  // Replace with the path to your Earth texture image

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    updateScreenSize();  // Initial check
    window.addEventListener('resize', updateScreenSize);  // Update on resize
    return () => window.removeEventListener('resize', updateScreenSize);  // Cleanup
  }, []);

  // Update the orbiting dot's angle and position, and auto-rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      // Always auto-rotate the globe
      globeRef.current.rotation.y += 0.005;  // Apply scroll-based rotation based on difference

      // Fade in the orbiting dot
      if (opacity < 1) {
        setOpacity((prevOpacity) => Math.min(prevOpacity + 0.01, 1));  // Gradually increase opacity
      }

      // Start fading in the OrbitDot after the globe has reached full opacity
      if (opacity === 1 && dotOpacity < 1) {
        setDotOpacity((prevDotOpacity) => Math.min(prevDotOpacity + 0.02, 1));  // Delayed fade-in
      }

      // Update the orbiting dot's position based on the globe's position
      if (dotRef.current) {
        const baseRadius = isMobile ? 0.4 : 0.85;  // Adjust orbit radius for mobile vs desktop
        setDotAngle((prevAngle) => prevAngle + speed);  // Reverse orbit direction

        const position = new THREE.Vector3();
        position.x = baseRadius * Math.cos(dotAngle);  // X-axis movement
        position.z = baseRadius * Math.sin(dotAngle);  // Z-axis movement (horizontal orbit)
        position.y = 0;  // Keep Y-axis constant for horizontal orbit

        dotRef.current.position.set(position.x, position.y, position.z);
      }
    }
  });

  return (
    <group>
      {/* The main globe sphere with animated position */}
      <group position={[0, 0, 0]}>
        <Sphere ref={globeRef} args={isMobile ? [0.3, 64, 64] : [0.7, 64, 64]}>  {/* Adjust globe size */}
          <meshStandardMaterial map={earthTexture} />
        </Sphere>
      </group>

      {/* Single orbiting dot with texture and fade-in */}
      <group ref={dotRef}>
        <OrbitDot position={[0, 0, 0]} texturePath="/moontexture.jpg" size={0.1} opacity={dotOpacity} />
      </group>
    </group>
  );
};

export default SSEarth;
