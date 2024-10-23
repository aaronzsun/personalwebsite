"use client";

import { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import { Box, Typography, Link, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
  const isMenuOpen = Boolean(anchorEl);

  // State for menu visibility and initial slide-in
  const [showMenu, setShowMenu] = useState(false); // Initially offscreen
  const [menuLoaded, setMenuLoaded] = useState(false); // For initial load
  const lastScrollY = useRef(0);

  // Function to handle scroll direction and toggle menu visibility near the top
  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY < 300 && scrollY < lastScrollY.current) {
      // Only show the menu when scrolling up and near the top (within 200px)
      setShowMenu(true);
    } else {
      // Hide the menu when scrolling down or far from the top
      setShowMenu(false);
    }

    lastScrollY.current = scrollY; // Update last scroll position
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
        setMenuLoaded(true); // After preloader, trigger slide-down
        setTimeout(() => setShowMenu(true)); // Show menu after slight delay for smooth slide
      }, 0);
    }, 2500);

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: 'smooth' });
    handleMenuClose();
  };

  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

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
                <span style={{ color: '#36ffe7' }}>01. </span> My TLDR
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
                <span style={{ color: '#36ffe7' }}>02. </span> Where I&apos;ve Worked
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
                <span style={{ color: '#36ffe7' }}>03. </span> Some Fun Projects
              </Link>
              <Link
                component="button"
                onClick={() => scrollToSection(4)}
                color="inherit"
                sx={{
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  color: '#afafaf',
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                <span style={{ color: '#36ffe7' }}>04. </span> Get In Touch
              </Link>
            </Box>
          </Box>

          {/* Globe background */}
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
          <Box ref={sectionRefs[0]} height="100vh" width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={'fade-in section1'}>
            <Box className="section-content">
              <Typography variant="h3" component="h1">
                <span style={{ color: '#36ffe7' }}>Hi, I&apos;m Aaron. </span>
              </Typography>
              <Typography variant="h3" component="h1">
                <span ref={typedElement} className="typed-text"></span>
              </Typography>
              <Typography variant="subtitle1" color="#afafaf" sx={{ mt: 1 }}>
                I&apos;m a software engineer and data-enthusiast passionate about delivering great digital experiences. 
                I specialize in building full-stack products with elegant and intuitive designs. 
                I&apos;m currently based in San Francisco seeking new and challenging opportunities.
              </Typography>
            </Box>
          </Box>

          {/* Other sections remain the same */}
          <Box ref={sectionRefs[1]} height="90vh" width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={'section'}>
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="#dbdbdb">
                <span style={{ color: '#36ffe7' }}>01.</span> My TLDR
              </Typography>
              <AboutMePanel />
            </Box>
          </Box>

          <Box ref={sectionRefs[2]} height="90vh" width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={'section'}>
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="#dbdbdb">
                <span style={{ color: '#36ffe7' }}>02.</span> Where I&apos;ve Worked
              </Typography>
              <TabPanel />
            </Box>
          </Box>

          <Box ref={sectionRefs[3]} height="90vh" width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={'section'}>
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="#dbdbdb">
                <span style={{ color: '#36ffe7' }}>03.</span> Some Fun Projects
              </Typography>
              <ProjectPanel />
            </Box>
          </Box>

          <Box ref={sectionRefs[4]} height="70vh" width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={'section'}>
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="#dbdbdb">
                <span style={{ color: '#36ffe7' }}>04.</span> Get In Touch!
              </Typography>
              <Typography sx={{ mt: 3 }} variant="subtitle1" gutterBottom color="#36ffe7">
                <Link 
                  href="https://www.linkedin.com/in/aaronzsun/" 
                  color="#36ffe7" 
                  target="_blank" 
                  sx={{ textDecoration: 'none', transition: 'opacity 0.3s', '&:hover': { opacity: 0.7 } }}
                >
                  LinkedIn
                </Link>
              </Typography>
              <Typography variant="subtitle1" gutterBottom color="#36ffe7">
                <Link 
                  href="https://github.com/aaronzsun" 
                  color="#36ffe7" 
                  target="_blank" 
                  sx={{ textDecoration: 'none', transition: 'opacity 0.3s', '&:hover': { opacity: 0.7 } }}
                >
                  GitHub
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
