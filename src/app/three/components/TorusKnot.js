'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';  // Import Torus Knot geometry
import { useSpring, animated } from '@react-spring/three';
import { TextureLoader } from 'three';


const TorusKnotGeometry = () => {
  const torusKnotRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const texture = useLoader(TextureLoader, '/wood.jpg');  // Replace with the path to your Earth texture image


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const { position: springPosition } = useSpring({
    position: isMobile ? [0, 0, 0] : [-1, 0.5, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useFrame(() => {
    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.y = scrollY * 0.005;
      torusKnotRef.current.rotation.x = scrollY * 0.005;
    }
  });

  return (
    <group>
      <animated.group position={springPosition}>
        <TorusKnot ref={torusKnotRef} args={[0.7, 0.4, 100, 16]} >
            <meshStandardMaterial map={texture} />  {/* Example color: Green */}
        </TorusKnot>
      </animated.group>
    </group>
  );
};

export default TorusKnotGeometry;
