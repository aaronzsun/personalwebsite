"use client";

import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

import { Box, Typography, Button, Link } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from "../theme/theme"
import localFont from "next/font/local";

import Globe from './components/Globe'
import Cube from './components/Cube'
import Saturn from './components/Saturn';
import Sun from './components/Sun';
import Cube2 from './components/Cube2';
import Cube3 from './components/Cube3';



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
  const [menuLoaded, setMenuLoaded] = useState(false); // For initial load
  const lastScrollY = useRef(0);
  const [activeCategory, setActiveCategory] = useState('planets'); // Default to planets
  const [transitioning, setTransitioning] = useState(false); // Added for transition effect
  const [fadeIn, setFadeIn] = useState(true); // For content fade-in

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadTimeout = setTimeout(() => {
      setPreloaderVisible(false);
      setTimeout(() => {
        setLoading(false);
        setMenuLoaded(true);
        setTimeout(() => setShowMenu(true), 300);
      }, 1000);
    }, 3000);

    if (!loading) {
      return () => {
        clearTimeout(loadTimeout);
      };
    }
  }, [loading]);
  
  const handleToggle = (category) => {
    setTransitioning(true); // Show preloader during transition
    setFadeIn(false); // Reset fade-in
    setTimeout(() => {
      setActiveCategory(category); // Set new category
      setTransitioning(false); // End transition
      setTimeout(() => setFadeIn(true), 300)
    }, 2000); // Duration of the preloader
  };


  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY < 0) return;

    const isMobile = window.innerWidth <= 768;  // Adjust the width as per your breakpoint
    const threshold = isMobile ? 150 : 300;

    if (scrollY < threshold && scrollY < lastScrollY.current) {
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
                <Link href="/" passHref sx={{ textDecoration: 'none' }}>
                    <Button 
                    component="a" 
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
                  <span style={{ color: '#afafaf' }}> I like building cool stuff with three. </span>
                </Typography>
                <Button 
                  variant="outlined" 
                  component="a" 
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
                  pt: 5,
                  display: 'flex', 
                  justifyContent: 'center', 
                  height: { xs: '20vh', sm: '20vh', md: '20vh' },
                  minHeight: { xs: '20vh', sm: '20vh', md: '20vh' }
                }}
            >
                <Box sx={{ 
                  width: { xs: '90%', md: '540px' },
                  textAlign: 'center',  // Center the text inside this Box as well
                }}>
                  <Typography variant="h6" component="h1" color="white" sx={{ fontweight: '600', fontFamily: 'var(--font-iosevka), monospace', fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.6rem' } }}>
                    SELECT CATEGORY
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleToggle('planets')}
                    size="large"
                    sx={{
                        mr: 3,
                        fontFamily: 'var(--font-iosevka), monospace',
                        width: { xs: "100px", sm: "140px", md: "140px" },
                        mt: 4,
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
                    onClick={() => handleToggle('blocks')}
                    size="large"
                    sx={{
                        fontFamily: 'var(--font-iosevka), monospace',
                        width: { xs: "100px", sm: "140px", md: "140px" },
                        mt: 4,
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
            <Box sx={{ width: '100%', position: 'relative', minHeight: '80vh', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
                {transitioning && (
                      <div className={`preloader ${transitioning ? 'fade-out' : ''}`} style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <Box>
                        <Box
                            width="100%"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Box className="section-content" sx={{ overflow: 'visible', pt: 10, position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' }, width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                                <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>01.</span> Earth & Moon
                                </Typography>
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                {/* Wrap the Globe in Canvas */}
                                    <Canvas>
                                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} castShadow />
                                        <Globe/>
                                    </Canvas>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            width="100%"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        >
                            <Box className="section-content" sx={{ overflow: 'visible', textAlign: 'right', position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' }, width: { xs: "100%", sm: "800px", md: "800px"},  minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                                <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>02.</span> The Sun
                                </Typography>
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                {/* Wrap the Globe in Canvas */}
                                    <Canvas>
                                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} castShadow />
                                        <Sun/>
                                    </Canvas>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            width="100%"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Box className="section-content" sx={{ overflow: 'visible', pt: 10, position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' }, width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                                <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>03.</span> Saturn & Rings
                                </Typography>
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                {/* Wrap the Globe in Canvas */}
                                    <Canvas>
                                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} castShadow />
                                        <Saturn/>
                                    </Canvas>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
                {!transitioning && activeCategory === 'blocks' && (
                    <Box>
                        <Box
                            width="100%"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Box className="section-content" sx={{ overflow: 'visible', pt: 10, position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' },  width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                                <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>01.</span> Cobblestone
                                </Typography>
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                {/* Wrap the Globe in Canvas */}
                                    <Canvas>
                                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} castShadow />
                                        <Cube/>
                                    </Canvas>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            width="100%"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        >
                            <Box className="section-content" sx={{ overflow: 'visible', textAlign: 'right', position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' }, width: { xs: "100%", sm: "800px", md: "800px"},  minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                                <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>02.</span> Oak Log
                                </Typography>
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                {/* Wrap the Globe in Canvas */}
                                    <Canvas>
                                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} castShadow />
                                        <Cube3/>
                                    </Canvas>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            width="100%"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Box className="section-content" sx={{ overflow: 'visible', pt: 10, position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' }, width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                                <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>03.</span> Snowy Grass
                                </Typography>
                                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                {/* Wrap the Globe in Canvas */}
                                    <Canvas>
                                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} castShadow />
                                        <Cube2/>
                                    </Canvas>
                                </Box>
                            </Box>
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
