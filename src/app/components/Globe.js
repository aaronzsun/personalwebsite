'use client'

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const OrbitDot = ({ position, texturePath, size, opacity }) => {
  const dotRef = useRef();  // Ref for the dot's rotation
  const dotTexture = useLoader(TextureLoader, texturePath);

  // Rotate the dot around its own axis
  useFrame(() => {
    if (dotRef.current) {
      dotRef.current.rotation.y -= 0.005;  // Adjust the speed of rotation here
    }
  });

  return (
    <Sphere ref={dotRef} position={position} args={[size, 16, 16]}>
      <meshStandardMaterial color="#C0C0C0" map={dotTexture} opacity={opacity} transparent={true}/>
    </Sphere>
  );
};

const Globe = () => {
  const globeRef = useRef();
  const orbitRef = useRef();  // Ref for the orbiting dot
  const [scrollY, setScrollY] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [opacity, setOpacity] = useState(0);  // Initial opacity for fade-in
  const [dotOpacity, setDotOpacity] = useState(0);  // Opacity for OrbitDot fade-in
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);  // Track screen width
  const baseRadius = 1.3;  // Base orbit radius (before scaling)
  const speed = 0.0007;  // Speed for the orbiting dot

  const earthTexture = useLoader(TextureLoader, '/earthtexture.jpg');  // Replace with the path to your Earth texture image

  // Scroll handler to adjust globe position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate the globe and the dot independently
  useFrame(() => {
    if (globeRef.current) {
      // Globe rotation based on scroll
      if (screenWidth >= 600) {
        const scrollScaleFactor = Math.min(1.5 + scrollY * 0.002, 2.5);

        setScale(scrollScaleFactor);

        // Apply scaling
        globeRef.current.scale.set(scale, scale, scale);
      } else {
        // Reset to default scale if screen is less than 600px
        globeRef.current.scale.set(1.5, 1.5, 1.5);
      }

      // Handle opacity for fade-in effect
      if (opacity < 1) {
        setOpacity((prevOpacity) => Math.min(prevOpacity + 0.01, 1));  // Gradually increase opacity
      }

      // Start fading in the OrbitDot after the globe has reached full opacity
      if (opacity === 1 && dotOpacity < 1) {
        setDotOpacity((prevDotOpacity) => Math.min(prevDotOpacity + 0.02, 1));  // Delayed fade-in
      }

      // Apply rotation to the globe
      globeRef.current.rotation.y += 0.003;
      globeRef.current.material.opacity = opacity;
      globeRef.current.material.transparent = true;

      // Slide the globe horizontally as you scroll
      if (screenWidth >= 600) {
        const newXPosition = Math.min(2.5 + scrollY * 0.01, 4.5);  // Max slide distance: 5 units
        globeRef.current.position.x = newXPosition;
      } else {
        globeRef.current.position.x = 2.5;  // No movement for smaller screens
      }

      // Update the position of the single dot along its orbit
      if (orbitRef.current) {
        const angle = (Date.now() * speed) % (Math.PI * 2);  // Update the angle over time

        const position = new THREE.Vector3();
        position.x = baseRadius * scale * Math.cos(angle);  // Horizontal orbit (x-axis changes)
        position.z = baseRadius * scale * Math.sin(angle);  // z-axis changes for circular orbit

        const globePosition = globeRef.current.position;  // Globe's position for translation
        orbitRef.current.position.set(
          globePosition.x + position.x,
          globePosition.y + position.y,
          globePosition.z + position.z
        );  // Adjust for the globe's position
      }
    }
  });

  return (
    <group>
      {/* The main globe sphere */}
      <Sphere ref={globeRef} args={[1, 64, 64]}>
        <meshStandardMaterial color="#C0C0C0" map={earthTexture} opacity={opacity}/>
      </Sphere>

      {/* Render the single orbiting dot with texture and rotation */}
      <group ref={orbitRef}>
        <OrbitDot position={[0, 0, 0]} texturePath="/moontexture.jpg" size={0.09 * scale} opacity={dotOpacity} />
      </group>
    </group>
  );
};

export default Globe;