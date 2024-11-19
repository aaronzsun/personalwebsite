"use client";

import { useEffect, useState, useRef } from 'react';
// import Head from 'next/head';
import { Helmet } from 'react-helmet';

import { Box, Typography, Button, Link } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import localFont from "next/font/local";

import BlogPost1 from './components/BlogPost1';
import BlogPost2 from './components/BlogPost2';
import BlogPost3 from './components/BlogPost3';
import BlogPost4 from './components/BlogPost4';
import BlogPost5 from './components/BlogPost5';



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


export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  const [showMenu, setShowMenu] = useState(false); // Initially offscreen
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY < 0) return;

    const isMobile = window.innerWidth <= 768;  // Adjust the width as per your breakpoint
    const threshold = isMobile ? 150 : 200;

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
      if (!loading) {
        return () => {
          clearTimeout(loadTimeout);
        };
      }
      setPreloaderVisible(false);
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => setShowMenu(true), 100);
      }, 500);
    }, 2500);

    
  }, [loading]);


  const sectionRef = useRef(null);

  // Function to scroll to the section
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
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
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              className='fade-in topSection'
            >
              <Box className="section-content">
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", ml: 0.5, mb: { xs: 5, sm: 3.5, md: 3.5}, fontSize: { xs: '1rem', sm: '1.4rem', md: '1.4rem' }  }}>
                  <span style={{ color: '#36ffe7' }}> Hello World! I&apos;m Aaron. </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontWeight: "500", mb: { xs: 0, sm: 2, md: 2}, fontSize: { xs: '2.5rem', sm: '4rem', md: '4rem' }  }}>
                  <span style={{ color: 'white' }}> This is my blog. </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", ml: 0.5, mt: { xs: 2, sm: 2, md: 2}, mb: { xs: 2, sm: 2, md: 2}, fontSize: { xs: '1.2rem', sm: '1.7rem', md: '1.7rem' }  }}>
                  <span style={{ color: '#afafaf' }}> I write about random stuff. </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", ml: 0.5, mt: { xs: 2, sm: 2, md: 2}, mb: { xs: 2, sm: 6, md: 6}, fontSize: { xs: '1.2rem', sm: '1.7rem', md: '1.7rem' }  }}>
                  <span style={{ color: '#afafaf' }}> Or life. </span>
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
                      },
                      '@media (max-width: 600px)': {
                      size: 'large', // Use small size variant on small screens
                      }
                  }}
                  >
                  View Posts
                </Button>
              </Box>
            </Box>
            <Box
              ref={sectionRef}
              minHeight="100vh"
              width="100%"
              sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}
            >
              <Box className="section-content" sx = {{
                pr: 4
              }}>
                <Typography variant="subtitle2" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", mb: { xs: 4, sm: 4, md: 4}, fontSize: { xs: '0.6rem', sm: '0.8rem', md: '0.8rem' }  }}>
                  <span style={{ color: '#36ffe7' }}> [click a post to read] </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", mb: { xs: 4, sm: 4, md: 4}, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.5rem' }  }}>
                  <span style={{ color: 'white' }}> Featured </span>
                </Typography>
                <BlogPost5/>
                
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", mb: { xs: 4, sm: 4, md: 4}, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.3rem' }, mt: 8  }}>
                  <span style={{ color: 'white' }}> Other Posts </span>
                </Typography>
                {/* <BlogPost2/>
                <BlogPost3/>
                <BlogPost1/>
                <BlogPost4/> */}
              </Box>
            </Box>
          </Box>
          </main>
        </ThemeProvider>
      )}
    </>
  );
}
