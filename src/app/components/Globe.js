'use client'

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Define fixed axes for the orbits
const orbitPlanes = [
  { axis1: 'y', axis2: 'z' }, 
  { axis1: 'x', axis2: 'y' }, 
  { axis1: 'x', axis2: 'z' },
];

// Component to render each orbiting dot
const OrbitDot = ({ position, color = '#ffffff', size = 0.05 }) => {
  return (
    <Sphere position={position} args={[size, 16, 16]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

const Globe = () => {
  const globeRef = useRef();
  const orbitRefs = useRef([]);  // Refs for orbits to animate individually
  const [scrollY, setScrollY] = useState(0);
  const [dots, setDots] = useState([]);
  const [scale, setScale] = useState(1.5);
  const [opacity, setOpacity] = useState(0);  // Initial opacity for fade-in
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);  // Track screen width
  const baseRadius = 1.2;  // Base orbit radius (before scaling)
  const speed = 0.01;  // Constant speed for all dots

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

  // Initialize dots with 3 equally spaced dots per orbit
  useEffect(() => {
    const newDots = orbitPlanes.flatMap((plane) => 
      Array(2).fill(0).map((_, i) => ({
        angle: (i * (Math.PI * 2)) / 2,  // Space dots equally
        speed: speed,
        plane,
      }))
    );
    setDots(newDots);
  }, []);

  // Animate the globe and the dots independently
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
        setOpacity((prevOpacity) => Math.min(prevOpacity + 0.01, 1));
      }

      // Apply rotation
      globeRef.current.rotation.y += 0.003;

      globeRef.current.material.opacity = opacity;
      globeRef.current.material.transparent = true;

      // Slide the globe horizontally as you scroll
      if (screenWidth >= 600) {
        const newXPosition = Math.min(2 + scrollY * 0.01, 4.5);  // Max slide distance: 5 units
        globeRef.current.position.x = newXPosition;
      } else {
        globeRef.current.position.x = 2;  // No movement for screens smaller than 900px
      }

      // Update the position of each dot along its orbit, accounting for scale and translation
      orbitRefs.current.forEach((dotRef, index) => {
        if (dotRef) {
          const dot = dots[index];
          
          // Reverse the direction for dots on the YZ-plane
          if (dot.plane.axis1 === 'x' && dot.plane.axis2 === 'y') {
            dot.angle += dot.speed;  // Reverse the angle for YZ-plane
          } else {
            dot.angle -= dot.speed;  // Regular angle update for other planes
          }
      
          const { axis1, axis2 } = dot.plane;
          const currentAngle = dot.angle;
      
          const position = new THREE.Vector3();
      
          // Standard orbit with cos/sin on primary and secondary axes
          position[axis1] = baseRadius * scale * Math.cos(currentAngle);  // Primary axis
          position[axis2] = baseRadius * scale * Math.sin(currentAngle);  // Secondary axis
      
          // Apply the globe's rotation to the dots
          

          if (axis1 === 'x' && axis2 === 'z') {
            const additionalRotationMatrix = new THREE.Matrix4().makeRotationX(globeRef.current.rotation.z + 0.35);
            position.applyMatrix4(additionalRotationMatrix);
          }
          else {
            const globeRotationMatrix = new THREE.Matrix4().makeRotationY(globeRef.current.rotation.y);
            position.applyMatrix4(globeRotationMatrix);  // Apply the globe's rotation to the dot
          }
      
          const globePosition = globeRef.current.position;  // Globe's position for translation
          dotRef.position.set(
            globePosition.x + position.x,
            globePosition.y + position.y,
            globePosition.z + position.z
          );  // Adjust for the globe's position
        }
      });
    }
  });

  return (
    <group>
      {/* The main globe sphere */}
      <Sphere ref={globeRef} args={[1, 64, 64]}>
        <meshStandardMaterial color="#8488FF" wireframe={false} opacity={opacity} transparent />
      </Sphere>

      {/* Render orbiting dots (3 per orbit plane) */}
      {dots.map((dot, index) => (
        <group
          key={index}
          ref={(el) => (orbitRefs.current[index] = el)}  // Ref for each orbit
        >
          <OrbitDot position={[0, 0, 0]} color="#36ffe7" size={0.065} />
        </group>
      ))}
    </group>
  );
};

export default Globe;
