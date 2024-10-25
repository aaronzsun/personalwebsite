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
// import DodecahedronGeometry from './components/Dodecahedron';
// import TorusKnotGeometry from './components/TorusKnot';
import Saturn from './components/Saturn';
import Sun from './components/Sun';
// import TextGeometryComponent from './components/Text';


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
  const typedElement = useRef(null);
  const [loading, setLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [showMenu, setShowMenu] = useState(false); // Initially offscreen
  const [menuLoaded, setMenuLoaded] = useState(false); // For initial load
  const lastScrollY = useRef(0);

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
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadTimeout = setTimeout(() => {
      setPreloaderVisible(false);
      setTimeout(() => {
        setLoading(false);
        setMenuLoaded(true);
        setTimeout(() => setShowMenu(true));
      }, 0);
    }, 3000);

    if (!loading) {
      return () => {
        clearTimeout(loadTimeout);
      };
    }
  }, [loading]);


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
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className="section-content" sx={{ overflow: 'visible', pt: 10, position: 'relative', width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
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
                <Box className="section-content" sx={{ overflow: 'visible', textAlign: 'right', position: 'relative', width: { xs: "100%", sm: "800px", md: "800px"},  minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>02.</span> Minecraft Cobblestone
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
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className="section-content" sx={{ overflow: 'visible',position: 'relative', width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
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
            <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Box sx={{ p:0, m:0, overflow: 'visible', textAlign: 'right', position: 'relative', width: { xs: "100%", sm: "800px", md: "800px"},  minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>04.</span> The Sun (Me)
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
          </Box>
          </main>
        </ThemeProvider>
      )}
    </>
  );
}
