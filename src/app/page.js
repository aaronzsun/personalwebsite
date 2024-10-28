"use client";

import React, { Suspense, useEffect, useState, useRef } from 'react';

import Typed from 'typed.js';
import localFont from "next/font/local";

import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme/theme"
import { Avatar, Box, Typography, Link, Button } from '@mui/material';

import TabPanel from './components/TabPanel';
import TabPanelMobile from './components/TabPanelMobile'
import AboutMePanel from './components/AboutMePanel';
import Globe from './components/Globe';
import Contact from './components/Contact'
import Blog from './components/Blog'
// import NavMenu from './components/NavMenu';
// import ProjectDisplay from './components/ProjectDisplay';   

const ProjectDisplay = React.lazy(() => import('./components/ProjectDisplay'));


const interTight = localFont({
  src: "./fonts/InterTight.ttf",
  variable: "--font-inter-tight",
  weight: "100 900",
});

const iosevka = localFont({
  src: "./fonts/Iosevka-Light.ttf",
  variable: "--font-iosevka",
  weight: "100 900",
});

const iosevkaMed = localFont({
  src: "./fonts/Iosevka-Medium.ttf",
  variable: "--font-iosevka-med",
  weight: "100 900",
});



export default function Home() {
  const typedElement = useRef(null);
  const [loading, setLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  // State for menu visibility and initial slide-in
  const [showMenu, setShowMenu] = useState(false); // Initially offscreen
  const lastScrollY = useRef(0);

  // New visibility state for sections
  const [isVisibleSection1, setIsVisibleSection1] = useState(false);
  const [isVisibleSection2, setIsVisibleSection2] = useState(false);
  const [isVisibleSection3, setIsVisibleSection3] = useState(false);
  const [isVisibleSection4, setIsVisibleSection4] = useState(false);
  const [isVisibleSection5, setIsVisibleSection5] = useState(false);

  const setIsVisibleFunctions = [
    setIsVisibleSection1,
    setIsVisibleSection2,
    setIsVisibleSection3,
    setIsVisibleSection4,
    setIsVisibleSection5,
  ];

  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

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

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Slide the menu down on initial load
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!loading && typedElement.current) {
      const options = {
        strings: [
          "I create fun stuff for the web.",
          "I build full-stack applications.",
          "I develop data-driven technology.",
          "I live in San Francisco, CA.",
        ],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        backDelay: 4000,
        startDelay: 0,
        smartBackspace: true,
        showCursor: false,
      };

      const typed = new Typed(typedElement.current, options);
    }

    const loadTimeout = setTimeout(() => {
  
       if (!loading) {
        return () => {
          typed.destroy();
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

  // IntersectionObserver to track section visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRefs[0].current) {
            setIsVisibleSection1(true);
          } else if (entry.target === sectionRefs[1].current) {
            setIsVisibleSection2(true);
          } else if (entry.target === sectionRefs[2].current) {
            setIsVisibleSection3(true);
          } else if (entry.target === sectionRefs[3].current) {
            setIsVisibleSection4(true);
          } else if (entry.target === sectionRefs[4].current) {
            setIsVisibleSection5(true);
          }
        }
      });
    }, observerOptions);

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  const scrollToSection = (index) => {
    // Set all previous sections to visible
    for (let i = 0; i < index; i++) {
      setIsVisibleFunctions[i](true); // Call the corresponding state setter
    }
  
    // Scroll to the target section
    sectionRefs[index].current.scrollIntoView({ behavior: 'smooth' });
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
            {/* Navigation Bar */}
            <Box
              position="fixed"
              top={showMenu ? '0' : '-80px'}
              right={0}
              p={4}
              zIndex={10}
              sx={{
              display: 'flex',
              gap: 1,
              transition: 'top 0.35s ease', 
              alignItems: 'center',
              }}
           >
            <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex' }, gap: { xs: 2, sm: 2, md: 2 } }}>
              <Link
                  component="button"
                  onClick={() => scrollToSection(0)}
                  color="inherit"
                  sx={{
                  fontFamily: 'var(--font-iosevka), monospace',
                  fontSize: { xs: '0.55rem', sm: '0.75rem', md: '0.75rem' },
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                  }}
              >
                  <span style={{ color: '#36ffe7' }}>01. </span> TLDR
              </Link>
              <Link
                  component="button"
                  onClick={() => scrollToSection(1)}
                  color="inherit"
                  sx={{
                  fontFamily: 'var(--font-iosevka), monospace',
                  fontSize: { xs: '0.55rem', sm: '0.75rem', md: '0.75rem' },
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                  }}
              >
                  <span style={{ color: '#36ffe7' }}>02. </span> WORK
              </Link>
              <Link
                  component="button"
                  onClick={() => scrollToSection(2)}
                  color="inherit"
                  sx={{
                  fontFamily: 'var(--font-iosevka), monospace',
                  fontSize: { xs: '0.55rem', sm: '0.75rem', md: '0.75rem' },
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                  }}
              >
                  <span style={{ color: '#36ffe7' }}>03. </span> PROJECTS
              </Link>
              <Link
                  component="button"
                  onClick={() => scrollToSection(3)}
                  color="inherit"
                  sx={{
                  fontFamily: 'var(--font-iosevka), monospace',
                  fontSize: { xs: '0.55rem', sm: '0.75rem', md: '0.75rem' },
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                  }}
              >
                  <span style={{ color: '#36ffe7' }}>04. </span> BLOG
              </Link>
              <Link
                  component="button"
                  onClick={() => scrollToSection(4)}
                  color="inherit"
                  sx={{
                  mr: { xs: 0.5, sm: 1.5, md: 1.5 },
                  fontFamily: 'var(--font-iosevka), monospace',
                  fontSize: { xs: '0.55rem', sm: '0.75rem', md: '0.75rem' },
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                  }}
              >
                  <span style={{ color: '#36ffe7' }}>05. </span> CONTACT
              </Link>
              <Button 
                  component="a" 
                  href="https://aaronzsun.com/resume" 
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined" 
                  size="small"
                  sx={{
                  textDecoration: 'none',
                  display: { xs: 'none', sm: 'flex', md: 'flex' },
                  fontFamily: 'var(--font-iosevka), monospace',
                  width: { xs: "90px", sm: "90px", md: "90px" },
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
                  Resume
              </Button>
            </Box>
          </Box>
            <div>
              <Canvas
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1,
                }}
                shadows
              >
                <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                <ambientLight intensity={0.2} />
                <spotLight
                  position={[0, 0.5, 4]}
                  intensity={4.6}
                  distance={100000}
                  angle={1.6}           // Narrower angle for focused light
                  penumbra={1}        // Increase penumbra for softer edges
                  decay={0}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-radius={4}     // Blur shadow edges
                />
                <Globe />
              </Canvas>
            </div>

            {/* Sections */}
            <Box
              width="100%"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              className='fade-in topSection'
            >
              <Box className="section-content">
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", mb: { xs: 3, sm: 2, md: 2}, fontSize: { xs: '0.8rem', sm: '1.2rem', md: '1.2rem' }  }}>
                  <span style={{ color: '#36ffe7' }}> Hello World! </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontWeight: "500", mb: { xs: 0, sm: 2, md: 2}, fontSize: { xs: '2.5rem', sm: '4rem', md: '4rem' }  }}>
                  <span style={{ color: 'white' }}>I&apos;m Aaron Sun. </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: "500", mt: { xs: 0, sm: 1, md: 1 }, lineHeight: 1 }} >
                  <span ref={typedElement} className="typed-text"></span>
                </Typography>
                <Typography variant="subtitle1" color="#afafaf" sx={{ mt: { xs: 3, sm: 4, md: 4 }, mb: { xs: 2, sm: 0, md: 0}, fontSize: { xs: '0.7rem', sm: '1rem', md: '1rem' } }}>
                  I&apos;m a full stack engineer and data-enthusiast passionate about delivering great digital experiences and
                  producing unique insights from data. I specialize in building full-stack products with elegant and intuitive designs. 
                  I&apos;m currently based in San Francisco seeking new challenges.
                </Typography>
                <Button 
                  variant="outlined" 
                  component="a" 
                  onClick={() => scrollToSection(0)}
                  size="large"
                  sx={{
                      textDecoration: 'none',
                      mr: 3,
                      fontFamily: 'var(--font-iosevka), monospace',
                      width: { xs: "140px", sm: "140px", md: "140px" },
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
                      }
                  }}
                  >
                  About Me
                </Button>
              </Box>
            </Box>

            <Box
              ref={sectionRefs[0]}
              width="100%"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              className={`section section1 ${isVisibleSection1 ? 'fade-in' : ''}`}
            >
              <Box className="section-content">
                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                  <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>01.</span> My TLDR
                </Typography>
                <AboutMePanel />
              </Box>
            </Box>
            <Box sx={{ mt: {xs: 5, sm: 0, md: 0}, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", minHeight: "20vh", mb: 10 }}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Avatar
                  alt="Mitzi Avatar"
                  src="/mitzi.png" // Ensure the correct path to the avatar image
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Typography variant="subtitle1" component="h2" color="white" sx={{ fontFamily: 'var(--font-iosevka), monospace',  fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' }}}>
                  Learn more with my AI friend Mitzi!
                </Typography>
                </Box>
                <Button 
                  href="/mitzi" 
                  variant="outlined" 
                  size="large"
                  sx={{
                    textDecoration: 'none',
                    fontFamily: 'var(--font-iosevka), monospace',
                    width: { xs: "180px", sm: "180px", md: "180px" },
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
                  CHAT WITH MITZI
                </Button>
              </Box>

            <Box
              ref={sectionRefs[1]}
              width="100%"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              className={`section section2 ${isVisibleSection2 ? 'fade-in' : ''}`}
            >
              <Box className="section-content" sx={{ width: { xs: "90%", md: "540px"} }}>
                <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' }}}>
                  <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace' }}>02.</span> Where I&apos;ve Worked
                </Typography>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block', md: 'block' }, // Hidden on small screens, visible on medium screens
                  }}
                >
                  <TabPanel />
                </Box>
                <Box
                  sx={{
                    display: { xs: 'block', sm: 'none', md: 'none' }, // Hidden on small screens, visible on medium screens
                  }}
                >
                  <TabPanelMobile />
                </Box>
              </Box>
            </Box>

            <Box
              ref={sectionRefs[2]}
              width="100%"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5 }} // remove marginbottom if adding more stuff
              className={`section section3 ${isVisibleSection3 ? 'fade-in' : ''}`}
            >
              <Box className="section-content">
                <Suspense>
                  <ProjectDisplay/>
                </Suspense>
              </Box>
            </Box>

            <Box
              ref={sectionRefs[3]}
              width="100%"
              sx={{
                display: 'flex',
                justifyContent: 'center',   // Centers content horizontally
                alignItems: 'center',       // Centers content vertically
                textAlign: 'center',        // Ensures text is centered
                pt: 5,
                pb: 10,
              }}
              className={`section section4 ${isVisibleSection4 ? 'fade-in' : ''}`}
            >
              <Box
                className="section-content"
                sx={{
                  width: { md: '540px' },
                }}
              >
                <Typography
                  variant="h6"
                  component="h1"
                  color="#dbdbdb"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' },
                    textAlign: 'center', 
                  }}
                >
                  <span
                    style={{
                      color: '#36ffe7',
                      fontSize: '0.8em',
                      fontFamily: 'var(--font-iosevka), monospace',
                    }}
                  >
                    04.
                  </span>{' '}
                  Stuff I Think About
                </Typography>
                <Blog/>
              </Box>
            </Box>

            <Box
              ref={sectionRefs[4]}
              width="100%"
              sx={{
                display: 'flex',
                justifyContent: 'center',   // Centers content horizontally
                alignItems: 'center',       // Centers content vertically
                textAlign: 'center',        // Ensures text is centered
              }}
              className={`section section5 ${isVisibleSection5 ? 'fade-in' : ''}`}
            >
              <Box
                className="section-content"
                sx={{
                  width: { md: '540px' },
                  textAlign: 'center',  // Center the text inside this Box as well
                }}
              >
                <Typography
                  variant="h6"
                  component="h1"
                  color="#dbdbdb"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' },
                    textAlign: 'center',   // Center the Typography content
                  }}
                >
                  <span
                    style={{
                      color: '#36ffe7',
                      fontSize: '0.8em',
                      fontFamily: 'var(--font-iosevka), monospace',
                    }}
                  >
                    05.
                  </span>{' '}
                  Let&apos;s Connect!
                </Typography>
                <Contact />
              </Box>
            </Box>
            <Box sx={{
                  textAlign: 'center',  // Center the text inside this Box as well
                  mt: '240px'
                }}>
              <Typography variant="body2" component="a"
              sx={{
                fontFamily: 'var(--font-iosevka), monospace',
                '&hover': {
                  cursor: 'pointer',
                }
              }}
              >
                <Link
                href="https://github.com/aaronzsun/personalwebsite"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                color: "#afafaf",
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline', 
                },
                }}
                >Built and Designed by Aaron Sun</Link>  
              </Typography>
            </Box>
          </Box>
          </main>
        </ThemeProvider>
      )}
    </>
  );
}
