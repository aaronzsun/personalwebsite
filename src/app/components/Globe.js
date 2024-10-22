import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const generatePointOnSphere = (radius, phiFactor, thetaFactor) => {
  const phi = Math.acos(2 * phiFactor - 1);
  const theta = 2 * Math.PI * thetaFactor;

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const createArcBetweenPoints = (start, end, elevationFactor = 1.0) => {
  const radius = start.length(); 

  const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
  const normal = midpoint.clone().normalize(); 
  const elevatedMidpoint = midpoint.add(normal.multiplyScalar(radius * elevationFactor)); 

  const controlPoint1 = new THREE.Vector3().lerpVectors(start, elevatedMidpoint, elevationFactor);
  const controlPoint2 = new THREE.Vector3().lerpVectors(elevatedMidpoint, end, elevationFactor);

  const curve = new THREE.CubicBezierCurve3(start, controlPoint1, controlPoint2, end);
  const points = curve.getPoints(200); 

  return points;
};

const SignalLine = ({ points, speed = 1, delayDuration = 1000, thickness = 5, color = '#ff1aff', startDelay = 0 }) => {
  const [phase, setPhase] = useState('waiting'); 
  const [progress, setProgress] = useState(0); 
  const [delayActive, setDelayActive] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('growing'); 
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  useFrame(() => {
    if (delayActive || phase === 'waiting') return; 

    if (phase === 'growing') {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + speed;
        if (newProgress >= points.length) {
          setPhase('disappearing');
          return points.length; 
        }
        return newProgress;
      });
    } else if (phase === 'disappearing') {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - speed;
        if (newProgress <= 0) {
          setDelayActive(true);
          setTimeout(() => {
            setPhase('growing'); 
            setDelayActive(false); 
            setProgress(0); 
          }, delayDuration); 
          return 0; 
        }
        return newProgress;
      });
    }
  });

  const flooredProgress = Math.floor(progress);
  const visiblePoints =
    phase === 'growing'
      ? points.slice(0, Math.min(flooredProgress, points.length))
      : points.slice(Math.max(0, points.length - flooredProgress)); 

  if (visiblePoints.length === 0) return null; 

  return (
    <Line
      points={visiblePoints}
      color={color}
      lineWidth={thickness} 
      opacity={0.8}
    />
  );
};

const Globe = () => {
  const colors = ['#ff1aff', '#ff8000', '#33cc33', '#ff0000', '#0066ff'];
  const globeRef = useRef();
  const groupRef = useRef(); 
  const [scrollY, setScrollY] = useState(0);
  const [lines, setLines] = useState([]);
  const [scale, setScale] = useState(0.1);
  const [zoomComplete, setZoomComplete] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const startPhiValue = [0.25, 0.45, 0.35, 0.55, 0.55, 0.75];
    const startThetaValue = [0.1, 0.6, 0.2, 0.7, 3.74, 3.24];
    const endPhiValue = [0.75, 0.85, 0.85, 0.95, 0.15, 0.25];
    const endThetaValue = [1.3, 0.85, 1.4, 1.5, 3.99, 4.4];
    const newLines = [];

    for (let i = 0; i < startPhiValue.length; i++) {
      const point1 = generatePointOnSphere(1, startPhiValue[i], startThetaValue[i]); 
      const point2 = generatePointOnSphere(1, endPhiValue[i], endThetaValue[i]); 
      const arcPoints = createArcBetweenPoints(point1, point2); 
      newLines.push(arcPoints);
    }
    setLines(newLines);
  }, []);

  useFrame(() => {
    if (globeRef.current && groupRef.current) {
      groupRef.current.rotation.y = scrollY * 0.005;

      const scrollScaleFactor = Math.min(2.5 + scrollY * 0.002, 4.2); 

      if (!zoomComplete) {
        if (scale < scrollScaleFactor) {
          setScale((prevScale) => Math.min(prevScale + 0.07, scrollScaleFactor)); 
        } else {
          setZoomComplete(true); 
        }
      }

      if (zoomComplete) {
        setScale(scrollScaleFactor); 
      }

      groupRef.current.scale.set(scale, scale, scale); 

      const newXPosition = Math.min(2 + scrollY * 0.01, 5); 
      groupRef.current.position.x = newXPosition;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={globeRef} args={[1, 64, 64]}>
        <meshStandardMaterial color="#8488FF" wireframe={false} />
      </Sphere>

      {lines.map((linePoints, index) => (
        <SignalLine
          key={index}
          points={linePoints}
          speed={0.8}
          delayDuration={6000}
          thickness={3}
          color={colors[index % colors.length]} 
          startDelay={(index * Math.random() * 3000) + 1000}
        />
      ))}
    </group>
  );
};

export default Globe;
