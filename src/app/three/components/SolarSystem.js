"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import SSMercury from './SSMercury';
import SSVenus from './SSVenus';
import SSEarth from './SSEarth';
import SSMars from './SSMars';
import SSJupiter from './SSJupiter';
import SSSaturn from './SSSaturn';
import SSUranus from './SSUranus';
import SSNeptune from './SSNeptune';
import SSSun from './SSSun';
import AsteroidBelt from './AsteroidBelt';

const SolarSystem = () => {
  const [distanceScale, setDistanceScale] = useState(1); // Scale for distances (1 = full size)

  const planets = [
    { component: <SSMercury />, distance: 5 * distanceScale, speed: 0.5 },
    { component: <SSVenus />, distance: 6.5 * distanceScale, speed: 0.38 },
    { component: <SSEarth />, distance: 9 * distanceScale, speed: 0.25 },
    { component: <SSMars />, distance: 11 * distanceScale, speed: 0.55 },
    { component: <SSJupiter />, distance: 17 * distanceScale, speed: 0.15 },
    { component: <SSSaturn />, distance: 21 * distanceScale, speed: 0.23 },
    { component: <SSUranus />, distance: 25 * distanceScale, speed: 0.15 },
    { component: <SSNeptune />, distance: 30 * distanceScale, speed: 0.34 },
  ];

  // Initialize refs for each planet's orbit after defining planets
  const orbits = useRef(planets.map(() => ({ current: null })));

  useEffect(() => {
    // Update distance scale based on screen width
    const updateScale = () => {
      if (window.innerWidth <= 600) {
        setDistanceScale(0.4);
      } else if (window.innerWidth <= 900) {
        setDistanceScale(0.5);
      } else {
        setDistanceScale(1);
      }
    };

    // Initial check and event listener for resizing
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale); // Cleanup
  }, []);

  // Animate each planet's orbit
  useFrame(({ clock }) => {
    planets.forEach((planet, index) => {
      if (orbits.current[index]) {
        orbits.current[index].rotation.y = clock.getElapsedTime() * planet.speed;
      }
    });
  });

  return (
    <>
      {/* Sun at the center */}
      <SSSun />

      <AsteroidBelt numAsteroids={200} innerRadius={12.7 * distanceScale} outerRadius={14.3 * distanceScale} />

      {/* Render each planet with its orbit and position */}
      {planets.map((planet, index) => (
        <group key={index} ref={(el) => (orbits.current[index] = el)} position={[0, 0, 0]}>
          <group position={[planet.distance, 0, 0]}>
            {planet.component}
          </group>
        </group>
      ))}
    </>
  );
};

export default SolarSystem;
