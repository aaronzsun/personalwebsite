"use client";

import { useEffect, useState, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { Box, Typography, Button, Link, Slider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from "../theme/theme"
import localFont from "next/font/local";

// import Globe from './components/Globe'
// import Cube from './components/Cube'
// import Saturn from './components/Saturn';
// import Sun from './components/Sun';
// import Cube2 from './components/Cube2';
// import Cube3 from './components/Cube3';
// import Mercury from './components/Mercury';
// import Venus from './components/Venus';
// import Jupiter from './components/Jupiter';
// import Uranus from './components/Uranus';
// import Neptune from './components/Neptune';
// import Mars from './components/Mars';

import SolarSystem from './components/SolarSystem';
import StarField from './components/StarField';

import PlanetsDisplay from './components/PlanetsDisplay'
import BlocksDisplay from './components/BlocksDisplay';
import DinoRave from './components2/DinoRave';

const AlwaysLookingCamera = ({ position, zoom, rotationXZ }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Convert rotationXZ from degrees to radians
    const angle = THREE.MathUtils.degToRad(rotationXZ);

    // Set camera position based on the angle, keeping it at the specified distance from the sun
    const distance = Math.sqrt(position[0] ** 2 + position[2] ** 2); // Calculate distance from origin
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);

    camera.position.set(x, position[1], z); // Maintain Y position, rotate XZ
    camera.lookAt(0, 0, 0);                 // Always look at the center (sun)
    
    // Adjust zoom based on Y position
    camera.zoom = zoom - (position[1] * 0.05);
    camera.updateProjectionMatrix();
  });

  return <OrthographicCamera makeDefault position={position} zoom={zoom} />;
};

const RotatingCamera = ({ radius, centerPosition, height = 50, speed = 0.25 }) => {
  const cameraRef = useRef();

  useFrame(({ clock }) => {
    if (cameraRef.current) {
      const t = clock.getElapsedTime() * speed;
      cameraRef.current.position.x = centerPosition[0] + Math.sin(t) * radius;
      cameraRef.current.position.z = centerPosition[2] + Math.cos(t) * radius;
      cameraRef.current.position.y = height;
      cameraRef.current.lookAt(...centerPosition);
    }
  });

  return (
    <PerspectiveCamera
      makeDefault
      ref={cameraRef}
      fov={50}
      near={0.1}
      far={1000}
    />
  );
};

// const AngledCamera = () => {
//   const { camera } = useThree();

//   // Set an angled position and focus on the origin
//   camera.position.set(0, 40, 0); // Higher Y for a top-down view
//   camera.lookAt(0, 0, 0);          // Center of the solar system
//   camera.zoom = 80;                // Adjust zoom to fit

//   return null;
// };


const interTight = localFont({
  src: "../fonts/InterTight.ttf",
  variable: "--font-inter-tight",
  weight: "100 900",
});

const iosevka = localFont({
  src: "../fonts/Iosevka-Light.ttf",
  variable: "--font-iosevka",
  weight: "100 900",
});

const iosevkaMed = localFont({
  src: "../fonts/Iosevka-Medium.ttf",
  variable: "--font-iosevka-med",
  weight: "100 900",
});


export default function Three() {
  const [loading, setLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  const [showMenu, setShowMenu] = useState(false); // Initially offscreen
  const lastScrollY = useRef(0);

  const [activeCategory, setActiveCategory] = useState(''); // Default to planets
  const [transitioning, setTransitioning] = useState(false); // Added for transition effect
  const [fadeIn, setFadeIn] = useState(true); // For content fade-in
  const [cameraZoom, setCameraZoom] = useState(27); // Default zoom level
  const [yPosition, setYPosition] = useState(20); // Initial Y position
  const [rotationXZ, setRotationXZ] = useState(0);
  const [radius, setRadius] = useState(150);

  useEffect(() => {
      const updateRadius = () => {
      if (window.innerWidth >= 900) {
          setRadius(100); // Larger screen breakpoint
      } else if (window.innerWidth >= 600) {
          setRadius(150); // Medium screen breakpoint
      } else {
          setRadius(200); // Small screen breakpoint
      }
      };

      window.addEventListener('resize', updateRadius);
      updateRadius(); // Set radius on mount based on initial window size

      return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY < 0) return;

    const isMobile = window.innerWidth <= 768;  // Adjust the width as per your breakpoint
    const threshold = isMobile ? 150 : 300;

    if (scrollY < threshold && scrollY < lastScrollY.current) {
      console.log(scrollY);
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }

    lastScrollY.current = scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadTimeout = setTimeout(() => {
      if (!loading) {
        return () => {
          clearTimeout(loadTimeout);
        };
      }
      setPreloaderVisible(false);
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => setShowMenu(true), 800);
      }, 500);
    }, 3000);
  }, [loading]);

  useEffect(() => {
    const updateZoom = () => {
      setCameraZoom(window.innerWidth < 600 ? 16 : 27); // Zoom out on small screens
    };

    // Initial check and add resize event listener
    updateZoom();
    window.addEventListener('resize', updateZoom);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', updateZoom);
  }, []);


  const handleToggle = (category) => {
    if (transitioning) return;

    if (category === activeCategory) {
      setFadeIn(false);
      setActiveCategory('');
      setTimeout(() => {
        setFadeIn(true);
      }, 200)
      return;
    }

    setTransitioning(true); // Show preloader during transition
    setFadeIn(false); // Reset fade-in
    setTimeout(() => {
      setActiveCategory(category); // Set new category
      setTransitioning(false); // End transition
      setTimeout(() => setFadeIn(true), 200)
    }, 2900); // Duration of the preloader
  };


  // Slide the menu down on initial load
  const sectionRef = useRef(null);

  // Function to scroll to the section
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {loading && (
        <div className={`preloader ${!preloaderVisible ? 'fade-out' : ''}`}>
          <div className="preloader-inner">
            <svg viewBox="0 0 100 100" width="150" height="150">
              <path
                className="infinity-line"
                d="M50 50 C20 90, 80 90, 50 50 C20 10, 80 10, 50 50"
                stroke="#36ffe7"
                fill="none"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      )}

      {!loading && (
        <ThemeProvider theme={theme}>
          <main className={`${interTight.variable} ${iosevka.variable} ${iosevkaMed.variable} antialiased`}>
          <Box display="flex" flexDirection="column" color="white" minWidth="100%">
          <Box
              position="fixed"
              top={showMenu ? '0' : '-80px'}  // Slide in/out based on menu state
              right={0}
              p={4}
              zIndex={10}
              sx={{
                display: 'flex',
                gap: 1,
                transition: 'top 0.35s ease',  // Smooth transition for sliding effect
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex' }, gap: { xs: 2, sm: 2, md: 2 } }}>
                <Link href="/" sx={{ textDecoration: 'none' }}>
                    <Button 
                    component="button" 
                    variant="outlined" 
                    size="small"
                    sx={{
                        textDecoration: 'none',
                        display: { xs: 'flex', sm: 'flex', md: 'flex' },
                        fontFamily: 'var(--font-iosevka), monospace',
                        width: { xs: "110px", sm: "110px", md: "110px" },
                        color: '#36ffe7', 
                        borderColor: '#36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: '0px 0px 0px #36ffe7', 
                        '&:hover': {
                        transform: 'translate(-5px, -3px)', 
                        boxShadow: '5px 5px 0px #36ffe7', 
                        borderColor: '#36ffe7', 
                        backgroundColor: 'rgba(54, 255, 231, 0.1)', 
                        cursor: "pointer"
                        },
                        '@media (hover: none)': {
                        '&:hover': {
                            transform: 'none', 
                            boxShadow: 'none', 
                        }
                        }
                    }}
                    >
                    Back To Home
                    </Button>
                </Link>
              </Box>
            </Box>
            {/* Sections */}
            <Box
              width="100%"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p:0, m:0 }}
              className='fade-in topSection'
            >
              <Box className="section-content">
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", ml: 0.5, mb: { xs: 5, sm: 3.5, md: 3.5}, fontSize: { xs: '1rem', sm: '1.4rem', md: '1.4rem' }  }}>
                  <span style={{ color: '#36ffe7' }}> Hello World! I&apos;m Aaron. </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontWeight: "500", ml: 0.5, mb: { xs: 0, sm: 2, md: 2}, fontSize: { xs: '1.3rem', sm: '2.45rem', md: '2.45rem' }  }}>
                  <span style={{ color: 'white' }}> This is my Three.JS Playground. </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", ml: 0.5, mt: { xs: 2, sm: 2, md: 2}, mb: { xs: 3, sm: 5, md: 5}, fontSize: { xs: '0.8rem', sm: '1.5rem', md: '1.5rem' }  }}>
                  <span style={{ color: '#afafaf' }}> I like building random stuff with three. </span>
                </Typography>
                <Button 
                  variant="outlined" 
                  component="h1" 
                  onClick={() => scrollToSection()}
                  size="large"
                  sx={{
                      textDecoration: 'none',
                      fontFamily: 'var(--font-iosevka), monospace',
                      width: { xs: "140px", sm: "140px", md: "140px" },
                      mt: { xs: 4, sm: 1, md: 1 },
                      color: '#36ffe7', 
                      borderColor: '#36ffe7', 
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                      boxShadow: '0px 0px 0px #36ffe7', 
                      '&:hover': {
                      transform: 'translate(-5px, -3px)', 
                      boxShadow: '5px 5px 0px #36ffe7', 
                      borderColor: '#36ffe7', 
                      backgroundColor: 'rgba(54, 255, 231, 0.1)', 
                      cursor: "pointer"
                      },
                      '@media (hover: none)': {
                      '&:hover': {
                          transform: 'none', 
                          boxShadow: 'none', 
                      }
                      }
                  }}
                  >
                  Get Started
                </Button>
              </Box>
            </Box>
            <Box
                width="100%"
                ref={sectionRef}
                sx={{ 
                  mb: 5,
                  pt: 5,
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: { xs: '20vh', sm: '20vh', md: '20vh' }
                }}
            >
                <Box sx={{ 
                    width: { xs: '90%', md: '700px' },
                    textAlign: 'center',  // Center the text inside this Box as well
                    mb: 4,
                  }}
                >
                  <Typography variant="h6" component="h1" color="#36ffe7" sx={{ fontweight: '600', fontFamily: 'var(--font-iosevka), monospace', fontSize: { xs: '1.8rem', sm: '1.8rem', md: '2rem' } }}>
                    THREE.JS BUILDS
                  </Typography> 
                </Box>
                <Box sx={{ 
                  width: { xs: '90%', md: '700px' },
                  textAlign: 'center',  // Center the text inside this Box as well
                  mb: 4,
                }}>
                  <Typography variant="h6" component="h1" color="white" sx={{ fontweight: '600', fontFamily: 'var(--font-iosevka), monospace', fontSize: { xs: '1.6rem', sm: '1.6rem', md: '1.6rem' } }}>
                    PROJECTS
                  </Typography> 
                  <Button 
                    variant="outlined" 
                    component="h1"
                    onClick={() => handleToggle('system')}
                    size="large"
                    sx={{
                        fontFamily: 'var(--font-iosevka), monospace',
                        width: { xs: "140px", sm: "140px", md: "140px" },
                        m: 3,
                        color: '#36ffe7', 
                        borderColor: '#36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: '0px 0px 0px #36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: activeCategory === 'system' ? '5px 5px 0px #36ffe7' : '0px 0px 0px #36ffe7', 
                        backgroundColor: activeCategory === 'system' ? 'rgba(54, 255, 231, 0.1)' : 'transparent',
                        transform: activeCategory === 'system' ? 'translate(-5px, -3px)' : 'none',
                        cursor: "pointer",
                        '&:hover': {
                        transform: 'translate(-5px, -3px)', 
                        boxShadow: '5px 5px 0px #36ffe7', 
                        backgroundColor: 'rgba(54, 255, 231, 0.1)', 
                        cursor: "pointer"
                        },
                        '@media (hover: none)': {
                        '&:hover': {
                            transform: 'none', 
                            boxShadow: 'none', 
                        }
                        },
                        '@media (max-width: 600px)': {
                        size: 'small', // Use small size variant on small screens
                        }
                    }}
                    >
                    Solar System
                  </Button>
                  <Button 
                    variant="outlined" 
                    component="h1"
                    onClick={() => handleToggle('dinorave')}
                    size="large"
                    sx={{
                        fontFamily: 'var(--font-iosevka), monospace',
                        width: { xs: "140px", sm: "140px", md: "140px" },
                        m: 3,
                        color: '#36ffe7', 
                        borderColor: '#36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: '0px 0px 0px #36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: activeCategory === 'dinorave' ? '5px 5px 0px #36ffe7' : '0px 0px 0px #36ffe7', 
                        backgroundColor: activeCategory === 'dinorave' ? 'rgba(54, 255, 231, 0.1)' : 'transparent',
                        transform: activeCategory === 'dinorave' ? 'translate(-5px, -3px)' : 'none',
                        cursor: "pointer",
                        '&:hover': {
                        transform: 'translate(-5px, -3px)', 
                        boxShadow: '5px 5px 0px #36ffe7', 
                        backgroundColor: 'rgba(54, 255, 231, 0.1)', 
                        cursor: "pointer"
                        },
                        '@media (hover: none)': {
                        '&:hover': {
                            transform: 'none', 
                            boxShadow: 'none', 
                        }
                        },
                        '@media (max-width: 600px)': {
                        size: 'small', // Use small size variant on small screens
                        }
                    }}
                    >
                    Dino Rave
                  </Button>         
                </Box>
                <Box sx={{ 
                  width: { xs: '90%', md: '700px' },
                  textAlign: 'center',  // Center the text inside this Box as well
                }}>
                  <Typography variant="h6" component="h1" color="white" sx={{ fontweight: '600', fontFamily: 'var(--font-iosevka), monospace', fontSize: { xs: '1.6rem', sm: '1.6rem', md: '1.6rem' } }}>
                    SIMPLE COMPONENTS
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component="h1"
                    onClick={() => handleToggle('planets')}
                    size="large"
                    sx={{
                        m: 3,
                        fontFamily: 'var(--font-iosevka), monospace',
                        width: { xs: "140px", sm: "140px", md: "140px" },
                        color: '#36ffe7', 
                        borderColor: '#36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: '0px 0px 0px #36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: activeCategory === 'planets' ? '5px 5px 0px #36ffe7' : '0px 0px 0px #36ffe7', 
                        backgroundColor: activeCategory === 'planets' ? 'rgba(54, 255, 231, 0.1)' : 'transparent',
                        transform: activeCategory === 'planets' ? 'translate(-5px, -3px)' : 'none',
                        cursor: "pointer",
                        '&:hover': {
                        transform: 'translate(-5px, -3px)', 
                        boxShadow: '5px 5px 0px #36ffe7', 
                        backgroundColor: 'rgba(54, 255, 231, 0.1)', 
                        cursor: "pointer"
                        },
                        '@media (hover: none)': {
                        '&:hover': {
                            transform: 'none', 
                            boxShadow: 'none', 
                        }
                        },
                        '@media (max-width: 600px)': {
                        size: 'small', // Use small size variant on small screens
                        }
                    }}
                    >
                    Planets
                  </Button>
                  <Button 
                    variant="outlined" 
                    component="h1"
                    onClick={() => handleToggle('blocks')}
                    size="large"
                    sx={{
                        fontFamily: 'var(--font-iosevka), monospace',
                        width: { xs: "140px", sm: "140px", md: "140px" },
                        m: 3,
                        color: '#36ffe7', 
                        borderColor: '#36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: '0px 0px 0px #36ffe7', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                        boxShadow: activeCategory === 'blocks' ? '5px 5px 0px #36ffe7' : '0px 0px 0px #36ffe7', 
                        backgroundColor: activeCategory === 'blocks' ? 'rgba(54, 255, 231, 0.1)' : 'transparent',
                        transform: activeCategory === 'blocks' ? 'translate(-5px, -3px)' : 'none',
                        cursor: "pointer",
                        '&:hover': {
                        transform: 'translate(-5px, -3px)', 
                        boxShadow: '5px 5px 0px #36ffe7', 
                        backgroundColor: 'rgba(54, 255, 231, 0.1)', 
                        cursor: "pointer"
                        },
                        '@media (hover: none)': {
                        '&:hover': {
                            transform: 'none', 
                            boxShadow: 'none', 
                        }
                        },
                        '@media (max-width: 600px)': {
                        size: 'small', // Use small size variant on small screens
                        }
                    }}
                    >
                    Blocks
                  </Button>  
                </Box>
            </Box>

            {/* THREE CONTENT */}

            <Box sx={{ width: '100%', position: 'relative', minHeight: '80vh', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
                {!transitioning && activeCategory === '' && (
                  <Box sx={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                    <Box
                      width="100%"
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Box>
                        <Typography variant="h6" component="h1" color="#36ffe7" sx={{ mt: { xs: 18, sm: 24, md: 24}, fontweight: '500', fontFamily: 'var(--font-iosevka), monospace', fontSize: { xs: '1rem', sm: '1.6rem', md: '1.6rem' } }}>
                          [select a category to begin]
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                {transitioning && (
                    <div className={`preloader ${!transitioning ? 'fade-out' : ''}`} style={{ 
                      position: 'absolute', 
                      top: '30%',
                      width: '100%', 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                      }}
                    >
                      <div className="preloader-inner">
                        <svg viewBox="0 0 100 100" width="150" height="150">
                          <path
                            className="infinity-line"
                            d="M50 50 C20 90, 80 90, 50 50 C20 10, 80 10, 50 50"
                            stroke="#36ffe7"
                            fill="none"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                )}
                <Box sx={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                {!transitioning && activeCategory === 'planets' && (
                   <Box
                        width="100%"
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <PlanetsDisplay />
                    </Box>
                )} 
                {!transitioning && activeCategory === 'blocks' && (
                    <Box>
                        <BlocksDisplay/>
                    </Box>
                )}
                {!transitioning && activeCategory === 'system' && (
                  
                <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  minHeight: '100vh', // Set full height of viewport for better scaling
                  overflow: 'hidden', // Ensures no overflow if content exceeds boundaries
                  pb: 10,
                }}
                >
                  <Box
                    sx={{
                      width: { xs: '150px', sm: '500px', md: '500px' },
                      minHeight: { xs: '270px', sm: 0, md: 0 },
                      p: 2,
                      pl: 3,
                      pr: 3,
                      background: 'transparent',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '0px solid #36ffe7',
                    }}
                  >
                    <Box>
                      <Typography variant="h6" component="h1" color="white" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontSize: '0.9rem', mb: 1, textAlign: 'center' }}>
                        Rotate X
                      </Typography>
                      <Slider
                        value={rotationXZ}
                        min={-180}
                        max={180}
                        step={1}
                        onChange={(e, value) => setRotationXZ(value)}
                        valueLabelDisplay="auto"
                        sx={{ height: 2, color: '#36ffe7', width:  { xs: '120px', sm: '120px', md: '120px' } }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="h1" color="white" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontSize: '0.9rem', mb: 1, textAlign: 'center' }}>
                        Rotate Y
                      </Typography>
                      <Slider
                        value={yPosition}
                        min={-70}
                        max={70}
                        step={1}
                        onChange={(e, value) => setYPosition(value)}
                        valueLabelDisplay="auto"
                        sx={{ height: 2, color: '#36ffe7', width:  { xs: '120px', sm: '120px', md: '120px' },}}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" component="h1" color="white" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontSize: '0.9rem', mb: 1, textAlign: 'center' }}>
                        Scale Zoom
                      </Typography>
                      <Slider
                        value={cameraZoom}
                        min={10}
                        max={50}
                        step={1}
                        onChange={(e, value) => setCameraZoom(value)}
                        valueLabelDisplay="auto"
                        sx={{ height: 2, color: '#36ffe7', width:  { xs: '120px', sm: '120px', md: '120px' } }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '90%',
                      height: { xs: '70vh', sm: '80vh', md: '80vh'}, // Set full height of viewport for better scaling
                      minHeight: { xs: '500px', sm: '600px', md: '700px'},
                      overflow: 'hidden', // Ensures no overflow if content exceeds boundaries
                      mt: 4,
                      backgroundColor: "black",
                      border: "1px solid #36ffe7",
                      borderRadius: "10px"
                    }}
                    >
                    <Canvas
                      style={{
                        display: 'block',
                      }}
                    >
                      <StarField numStars={10000} radius={100} />
                      <ambientLight intensity={0.18} />
                      <pointLight position={[0, 0, 0]} intensity={100} distance={1000} decay={2} castShadow />
                      <AlwaysLookingCamera position={[0, yPosition, 36]} zoom={cameraZoom} rotationXZ={rotationXZ} />

                      <SolarSystem />
                    </Canvas>
                  </Box>
                </Box>
                )}
                {!transitioning && activeCategory === 'dinorave' && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '100%',
                      minHeight: '100vh', // Set full height of viewport for better scaling
                      overflow: 'hidden', // Ensures no overflow if content exceeds boundaries
                      pb: 10,
                    }}
                    >
                      <Box
                        sx={{
                          width: { xs: '150px', sm: '150px', md: '150px' },
                          p: 2,
                          pl: 3,
                          pr: 3,
                          background: 'transparent',
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          border: '0px solid #36ffe7',
                        }}
                      >
                        <Box>
                          <Typography variant="h6" component="h1" color="white" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontSize: '0.9rem', mb: 1, textAlign: 'center' }}>
                            Camera Radius
                          </Typography>
                          <Slider
                            value={radius}
                            min={50}
                            max={240}
                            step={1}
                            onChange={(e, value) => setRadius(value)}
                            valueLabelDisplay="auto"
                            sx={{ height: 2, color: '#36ffe7', width:  { xs: '200px', sm: '200px', md: '200px' } }}
                          />
                        </Box>
                      </Box>
                    <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '90%',
                      height: { xs: '70vh', sm: '80vh', md: '80vh'}, // Set full height of viewport for better scaling
                      minHeight: { xs: '500px', sm: '600px', md: '700px'},
                      overflow: 'hidden', // Ensures no overflow if content exceeds boundaries
                      mt: 4,
                      backgroundColor: "black",
                      border: "1px solid #36ffe7",
                      borderRadius: "10px"
                    }}
                    >
                      <Canvas
                        style={{
                          display: 'block',
                        }}
                      >
                      <RotatingCamera radius={radius} centerPosition={[0, -5, 0]} height={50} speed={0.25} />

                      <DinoRave />
                      </Canvas>
                    </Box>
                  </Box>
                )} 
              </Box>
            </Box>
          </Box>
          </main>
        </ThemeProvider>
      )}
    </>
  );
}
