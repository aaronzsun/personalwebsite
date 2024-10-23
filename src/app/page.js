"use client";

import { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import { Box, Typography, Link, Button } from '@mui/material';
import TabPanel from './components/TabPanel';
import ProjectPanel from './components/ProjectPanel';
import AboutMePanel from './components/AboutMePanel';
import { Canvas } from '@react-three/fiber';
import Globe from './components/Globe';
import { OrthographicCamera } from '@react-three/drei';

export default function Home() {
  const typedElement = useRef(null);
  const [loading, setLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // State for menu visibility and initial slide-in
  const [showMenu, setShowMenu] = useState(false); // Initially offscreen
  const [menuLoaded, setMenuLoaded] = useState(false); // For initial load
  const lastScrollY = useRef(0);

  // New visibility state for sections
  const [isVisibleSection1, setIsVisibleSection1] = useState(false);
  const [isVisibleSection2, setIsVisibleSection2] = useState(false);
  const [isVisibleSection3, setIsVisibleSection3] = useState(false);
  const [isVisibleSection4, setIsVisibleSection4] = useState(false);

  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY < 300 && scrollY < lastScrollY.current) {
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

    const loadTimeout = setTimeout(() => {
      setPreloaderVisible(false);
      setTimeout(() => {
        setLoading(false);
        setMenuLoaded(true);
        setTimeout(() => setShowMenu(true));
      }, 0);
    }, 3000);

    if (!loading && typedElement.current) {
      const options = {
        strings: [
          "I design full-stack applications.",
          "I build data-driven technologies.",
          "I live in San Francisco, CA.",
        ],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        backDelay: 3000,
        startDelay: 0,
        smartBackspace: true,
        showCursor: false,
      };

      const typed = new Typed(typedElement.current, options);

      return () => {
        clearTimeout(loadTimeout);
        typed.destroy();
      };
    }
  }, [loading]);

  // IntersectionObserver to track section visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.85,
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
        <Box display="flex" flexDirection="column" color="white" minWidth="100%">
          {/* Navigation Bar */}
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
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Link
                component="button"
                onClick={() => scrollToSection(1)}
                color="inherit"
                sx={{
                  fontSize: '0.75rem',
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
                onClick={() => scrollToSection(2)}
                color="inherit"
                sx={{
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                <span style={{ color: '#36ffe7' }}>02. </span> Work
              </Link>
              <Link
                component="button"
                onClick={() => scrollToSection(3)}
                color="inherit"
                sx={{
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                <span style={{ color: '#36ffe7' }}>03. </span> Projects
              </Link>
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
            >
              <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} castShadow />
              <Globe />
            </Canvas>
          </div>

          {/* Sections */}
          <Box
            ref={sectionRefs[0]}
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className='fade-in topSection'
          >
            <Box className="section-content">
              <Typography variant="h3" component="h1" sx={{ fontWeight: "700", mb: { xs: 0, sm: 0, md: 2}, fontSize: { xs: '2.5rem', sm: '2.5rem', md: '3.5rem' }  }}>
                <span style={{ color: '#36ffe7' }}>Hi, I&apos;m Aaron. </span>
              </Typography>
              <Typography variant="h3" component="h1" sx={{mt: { xs: 0, sm: 0, md: 1 }, lineHeight: 1 }} >
                <span ref={typedElement} className="typed-text"></span>
              </Typography>
              <Typography variant="subtitle1" color="#afafaf" sx={{ mt: { xs: 3, sm: 3, md: 4 }, mb: { xs: 2, sm: 2, md: 0}, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1.05rem' } }}>
                I&apos;m a software engineer and data-enthusiast passionate about delivering great digital experiences.
                I specialize in building full-stack products with elegant and intuitive designs. 
                I&apos;m currently based in San Francisco seeking new challenges.
              </Typography>
              <Button 
                component="a" 
                href="https://github.com/aaronzsun" 
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined" 
                size="large"
                sx={{
                  width: { xs: "100px", sm: "100px", md: "140px" },
                  mt: 4,
                  mr: 4,
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
                GitHub
              </Button>

              <Button 
                variant="outlined" 
                component="a" 
                href="https://linkedin.com/in/aaronzsun" 
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                sx={{
                  width: { xs: "100px", sm: "100px", md: "140px" },
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
                LinkedIn
              </Button>      
            </Box>
          </Box>

          <Box
            ref={sectionRefs[1]}
            height="70vh"
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={`section ${isVisibleSection1 ? 'fade-in' : ''}`}
          >
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1rem', md: '1.4rem' } }}>
                <span style={{ color: '#36ffe7' }}>01.</span> My TLDR
              </Typography>
              <AboutMePanel />
            </Box>
          </Box>

          <Box
            ref={sectionRefs[2]}
            height="40vh"
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={`section ${isVisibleSection2 ? 'fade-in' : ''}`}
          >
            <Box className="section-content" sx={{ width: "540px", minHeight: "500px" }}>
              <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1rem', sm: '1rem', md: '1.4rem' }}}>
                <span style={{ color: '#36ffe7' }}>02.</span> Where I&apos;ve Worked
              </Typography>
              <TabPanel />
            </Box>
          </Box>

          <Box
            ref={sectionRefs[3]}
            height="40vh"
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={`section ${isVisibleSection3 ? 'fade-in' : ''}`}
          >
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ mb: 4, fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1rem', md: '1.4rem' } }}>
                <span style={{ color: '#36ffe7' }}>03.</span> Stuff I&apos;ve Built
              </Typography>
              <ProjectPanel />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
