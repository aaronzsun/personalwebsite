'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Dodecahedron } from '@react-three/drei';  // Import Dodecahedron geometry
import { useSpring, animated } from '@react-spring/three';
import { TextureLoader } from 'three';

const DodecahedronGeometry = () => {
  const dodecahedronRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const texture = useLoader(TextureLoader, '/inkpaint.jpg');  // Replace with the path to your Earth texture image


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
    position: isMobile ? [0, 0, 0] : [1, 0.5, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useFrame(() => {
    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.y = scrollY * 0.005;
      dodecahedronRef.current.rotation.x = scrollY * 0.005;
    }
  });

  return (
    <group>
      <animated.group position={springPosition}>
        <Dodecahedron ref={dodecahedronRef} args={[1.6]}>
          {/* Add color to the Dodecahedron using meshStandardMaterial */}
          <meshStandardMaterial map={texture} />  {/* Example color: Green */}
        </Dodecahedron>
      </animated.group>
    </group>
  );
};

export default DodecahedronGeometry;
