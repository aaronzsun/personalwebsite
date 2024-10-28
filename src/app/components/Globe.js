'use client'

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const OrbitDot = ({ position, texturePath, size, opacity }) => {
  const dotRef = useRef();
  const dotTexture = useLoader(TextureLoader, texturePath);

  useFrame(() => {
    if (dotRef.current) {
      dotRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <Sphere ref={dotRef} position={position} args={[size, 16, 16]} castShadow receiveShadow>
      {/* Set Moon color to a gray tone */}
      <meshStandardMaterial color="#808080" map={dotTexture} opacity={opacity} transparent />
    </Sphere>
  );
};

const Globe = () => {
  const globeRef = useRef();
  const orbitRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [opacity, setOpacity] = useState(0);
  const [dotOpacity, setDotOpacity] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const baseRadius = 1.3;
  const speed = 0.0007;

  const earthTexture = useLoader(TextureLoader, '/earthtexture.jpg');

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (globeRef.current) {
      if (screenWidth >= 600) {
        const scrollScaleFactor = Math.min(1.5 + scrollY * 0.0022, 3);
        setScale(scrollScaleFactor);
        globeRef.current.scale.set(scale, scale, scale);
      } else {
        globeRef.current.scale.set(1.5, 1.5, 1.5);
      }

      if (opacity < 1) {
        setOpacity((prevOpacity) => Math.min(prevOpacity + 0.01, 1));
      }

      if (opacity === 1 && dotOpacity < 1) {
        setDotOpacity((prevDotOpacity) => Math.min(prevDotOpacity + 0.02, 1));
      }

      globeRef.current.rotation.y += 0.003;
      globeRef.current.material.opacity = opacity;
      globeRef.current.material.transparent = true;

      if (screenWidth >= 600) {
        const newXPosition = Math.min(3.5 + scrollY * 0.01, 8.2);
        globeRef.current.position.x = newXPosition;
      } else {
        globeRef.current.position.x = 2.5;
      }

      if (orbitRef.current) {
        const angle = (Date.now() * speed) % (Math.PI * 2);
        const position = new THREE.Vector3(
          baseRadius * scale * Math.cos(angle),
          0,
          baseRadius * scale * Math.sin(angle)
        );
        const globePosition = globeRef.current.position;
        orbitRef.current.position.set(
          globePosition.x + position.x,
          globePosition.y,
          globePosition.z + position.z
        );
      }
    }
  });

  // Conditionally render the globe only if the screen width is 600px or more
  if (screenWidth < 600) return null;

  return (
    <group>
      {/* Earth with shadow casting and receiving */}
      <Sphere ref={globeRef} args={[1, 64, 64]} castShadow receiveShadow>
        <meshStandardMaterial color="#C0C0C0" map={earthTexture} opacity={opacity} transparent />
      </Sphere>

      {/* Orbiting Moon with shadow casting */}
      <group ref={orbitRef}>
        <OrbitDot position={[0, 0, 0]} texturePath="/moontexture.jpg" size={0.09 * scale} opacity={dotOpacity} />
      </group>
    </group>
  );
};

export default Globe;
