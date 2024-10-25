import { Sphere } from '@react-three/drei';

const OrbitDot = ({ position, color = '#afafaf', size = 0.065 }) => {
    return (
      <Sphere args={[size, 32, 32]} position={position}>
        <meshStandardMaterial color={color} />
      </Sphere>
    );
  };
  
  export default OrbitDot;