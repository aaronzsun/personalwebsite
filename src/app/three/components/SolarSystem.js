"use client"

import { useRef, useState, useEffect  } from 'react';
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
import AsteroidBelt from './AsteroidBelt'; // Adjust the import path as needed


const SolarSystem = () => {
  const [distanceScale, setDistanceScale] = useState(1); // 1 for full size, 0.7 for mobile

  useEffect(() => {
    // Function to update the scale based on screen width
    const updateScale = () => {
      if (window.innerWidth <= 600) {
        setDistanceScale(0.4);
      } else if (window.innerWidth <= 900) {
        setDistanceScale(0.5);
      } else {
        setDistanceScale(1);
      }
    };

    // Initial check and event listener for screen resizing
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale); // Cleanup
  }, []);
  const planets = [
    { component: <SSMercury />, distance: 5 * distanceScale, speed: 0.5 },
    { component: <SSVenus />, distance: 6.5 * distanceScale, speed: 0.4 },
    { component: <SSEarth />, distance: 9 * distanceScale, speed: 0.25 },
    { component: <SSMars />, distance: 11 * distanceScale, speed: 0.35 },
    { component: <SSJupiter />, distance: 17 * distanceScale, speed: 0.25 },
    { component: <SSSaturn />, distance: 21 * distanceScale, speed: 0.32 },
    { component: <SSUranus />, distance: 25 * distanceScale, speed: 0.15 },
    { component: <SSNeptune />, distance: 30 * distanceScale, speed: 0.34 },
  ];

  // Reference for each planet's orbit
  const orbits = planets.map(() => useRef());

  // Animate each planet's orbit
  useFrame(({ clock }) => {
    planets.forEach((planet, index) => {
      if (orbits[index].current) {
        orbits[index].current.rotation.y = clock.getElapsedTime() * planet.speed;
      }
    });
  });

  return (
    <>
      {/* Sun at the center */}
      <SSSun />

      <AsteroidBelt numAsteroids={200} innerRadius={12.7 * distanceScale} outerRadius={14.3 * distanceScale} />

      {/* Render each planet with its distance and orbit speed */}
      {planets.map((planet, index) => (
        <group key={index} ref={orbits[index]} position={[0, 0, 0]}>
          <group position={[planet.distance, 0, 0]}>
            {planet.component}
          </group>
        </group>
      ))}
    </>
  );
};

export default SolarSystem;
