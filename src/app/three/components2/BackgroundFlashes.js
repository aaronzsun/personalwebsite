import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BackgroundSphere = ({ radius = 300 }) => {
  const sphereRef = useRef();

  // Update the background sphere color with dulled tones
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const hue = (elapsed * 0.1) % 1; // Cycle through hues slowly
    if (sphereRef.current) {
      sphereRef.current.material.color.setHSL(hue, 0.4, 0.3); // Lower saturation and darker lightness
      sphereRef.current.material.opacity = 0.5; // Add transparency for a softened look
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial side={THREE.BackSide} transparent />
    </mesh>
  );
};

export default BackgroundSphere;
