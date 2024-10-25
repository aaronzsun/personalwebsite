import { useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';

const StarField = ({ numStars = 1000, radius = 500 }) => {
  // Generate random star positions within a spherical distribution
  const stars = useMemo(() => {
    const positions = [];
    for (let i = 0; i < numStars; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * 2 * Math.PI;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [numStars, radius]);

  return (
    <Points positions={stars}>
      <PointMaterial size={1.5} color="white" sizeAttenuation depthWrite={false} />
    </Points>
  );
};

export default StarField;
