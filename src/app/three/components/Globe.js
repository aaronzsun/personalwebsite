'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useSpring, animated } from '@react-spring/three';
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

const Globe = () => {
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

  // Define the position spring using react-spring based on whether it's mobile or desktop
  const { position: springPosition } = useSpring({
    position: isMobile ? [0, 0, 0] : [1, 0.5, 0],  // Mobile or desktop position
    config: { mass: 1, tension: 280, friction: 60 },  // Adjust the spring configuration for smoothness
  });

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
        const baseRadius = isMobile ? 1.15 : 1.7;  // Adjust orbit radius for mobile vs desktop
        setDotAngle((prevAngle) => prevAngle + speed);  // Reverse orbit direction

        const position = new THREE.Vector3();
        position.x = baseRadius * Math.cos(dotAngle);  // X-axis movement
        position.z = baseRadius * Math.sin(dotAngle);  // Z-axis movement (horizontal orbit)
        position.y = 0;  // Keep Y-axis constant for horizontal orbit

        dotRef.current.position.set(
          springPosition.get()[0] + position.x,
          springPosition.get()[1] + position.y,
          springPosition.get()[2] + position.z
        );
      }
    }
  });

  return (
    <group>
      {/* The main globe sphere with animated position */}
      <animated.group position={springPosition}>
        <Sphere ref={globeRef} args={isMobile ? [0.85, 64, 64] : [1.3, 64, 64]}>  {/* Adjust globe size */}
          <meshStandardMaterial map={earthTexture} />
        </Sphere>
      </animated.group>

      {/* Single orbiting dot with texture and fade-in */}
      <group ref={dotRef}>
        <OrbitDot position={[0, 0, 0]} texturePath="/moontexture.jpg" size={0.15} opacity={dotOpacity} />
      </group>
    </group>
  );
};

export default Globe;
