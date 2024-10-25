import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Helper function to generate random positions
const getRandomPosition = (innerRadius, outerRadius) => {
  const angle = Math.random() * 2 * Math.PI;
  const radius = THREE.MathUtils.lerp(innerRadius, outerRadius, Math.random());
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);
  const y = (Math.random() - 0.5) * 0.2; // Slight vertical offset
  return [x, y, z];
};

const AsteroidBelt = ({ numAsteroids = 200, innerRadius = 15, outerRadius = 20 }) => {
  const beltRef = useRef(); // Reference for the entire belt group

  // Generate positions and sizes for each asteroid
  const asteroids = useMemo(() => 
    Array.from({ length: numAsteroids }, () => ({
      position: getRandomPosition(innerRadius, outerRadius),
      size: Math.random() * 0.1 + 0.02,
    })), 
    [numAsteroids, innerRadius, outerRadius]
  );

  // Rotate the entire asteroid belt group
  useFrame(({ clock }) => {
    if (beltRef.current) {
      beltRef.current.rotation.y = 0.1 * clock.getElapsedTime(); // Control rotation speed here
    }
  });

  return (
    <group ref={beltRef}>
      {asteroids.map((asteroid, index) => (
        <Sphere key={index} args={[asteroid.size, 8, 8]} position={asteroid.position}>
          <meshStandardMaterial color="#808080" />
        </Sphere>
      ))}
    </group>
  );
};

export default AsteroidBelt;
