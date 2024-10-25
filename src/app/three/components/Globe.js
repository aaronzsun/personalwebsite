'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import OrbitDot from './OrbitDot';

const Globe = () => {
  const globeRef = useRef();
  const dotRef = useRef();  // Ref for the single orbiting dot
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);  // Track whether we're on mobile
  const speed = 0.007;  // Orbit speed for the single dot
  const [dotAngle, setDotAngle] = useState(0);  // Angle for the orbiting dot

  const earthTexture = useLoader(TextureLoader, '/earthtexture.jpg');  // Replace with the path to your Earth texture image

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    updateScreenSize();  // Initial check
    window.addEventListener('resize', updateScreenSize);  // Update on resize
    return () => window.removeEventListener('resize', updateScreenSize);  // Cleanup
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);  // Track scroll position
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      
      globeRef.current.rotation.y = scrollY * 0.005;  // Apply scroll-based rotation based on difference

      // Update the orbiting dot's position based on the globe's position
      if (dotRef.current) {
        const baseRadius = isMobile ? 1.4 : 1.7;  // Adjust orbit radius for mobile vs desktop
        setDotAngle((prevAngle) => prevAngle - speed);  // Update dot angle for independent orbit

        const position = new THREE.Vector3();
        position.x = baseRadius * Math.cos(dotAngle);  // X-axis movement
        position.z = baseRadius * Math.sin(dotAngle);  // Z-axis movement (horizontal orbit)
        position.y = 0;  // Keep Y-axis constant for horizontal orbit

        // Apply the globe's position + rotation to the orbit dot
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
        <Sphere ref={globeRef} args={isMobile ? [1.2, 64, 64] : [1.4, 64, 64]}>  {/* Adjust globe size */}
            <meshStandardMaterial map={earthTexture} />
        </Sphere>
      </animated.group>

      {/* Single orbiting dot */}
      <group ref={dotRef}>
        <OrbitDot position={[0, 0, 0]} color="#afafaf" size={0.1} />
      </group>
    </group>
  );
};

export default Globe;
