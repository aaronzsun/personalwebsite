"use client";

import { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import { Box, Typography, Link } from '@mui/material';
import TabPanel from './components/TabPanel';
import ProjectPanel from './components/ProjectPanel';

export default function Home() {
  const typedElement = useRef(null);
  const [loading, setLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVisibleSection1, setIsVisibleSection1] = useState(false);
  const [isVisibleSection2, setIsVisibleSection2] = useState(false);
  const [isVisibleSection3, setIsVisibleSection3] = useState(false);
  const [isVisibleSection4, setIsVisibleSection4] = useState(false);
  const [isVisibleSection5, setIsVisibleSection5] = useState(false);
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    window.scrollTo(0, 0);
  
    const loadTimeout = setTimeout(() => {
      setPreloaderVisible(false);
      setTimeout(() => {
        setLoading(false);  // Set loading to false after the timeout
      }, 1000);
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
        typed.destroy();  // Cleanup Typed.js instance when component unmounts
      };
    }
  
  }, [loading]);  // Add 'loading' to the dependency array
  

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
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
          
          {/* Section 1 */}
          <Box
            ref={sectionRefs[0]}
            height="100vh"  // Full viewport height
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={'fade-in'}
          >
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

          {/* Section 2 */}
          <Box
            ref={sectionRefs[1]}
            height="60vh"  // Full viewport height for section 2
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={isVisibleSection2 ? 'fade-in' : ''}
          >
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="white">
                <span style={{ color: '#36ffe7' }}>01.</span> My Personal TLDR
              </Typography>
              <Typography variant="subtitle1" color="#afafaf" sx={{ mt: 2 }}>
                I recently graduated from Harvard in Math and CS before moving out to the Bay in
                August of 2024. I&apos;m a bit of a jack of all trades- from academia to industry to finance,
                I&apos;ve built and deployed code to tackle all sorts of problems. I love working with all parts of the technical stack, 
                whether that be manipulating and analyzing data, integrating backend softwares and databases with 
                frontend platforms, or putting it all together to create scalable yet individualized experiences. Outside of the digital world,
                I enjoy playing soccer and basketball and cooking (debatably) yummy food!
              </Typography>
            </Box>
          </Box>

          {/* Section 3 */}
          <Box
            ref={sectionRefs[2]}
            height="50vh"  // Full viewport height for section 3
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={isVisibleSection3 ? 'fade-in' : ''}
          >
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="white">
                <span style={{ color: '#36ffe7' }}>02.</span> Where I&apos;ve Worked
              </Typography>
              <TabPanel />
            </Box>
          </Box>

          {/* Section 4 */}
          <Box
            ref={sectionRefs[3]}
            minHeight="50vh"  // Full viewport height for section 3
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={isVisibleSection4 ? 'fade-in' : ''}
          >
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="white">
                <span style={{ color: '#36ffe7' }}>03.</span> Some Fun Projects
              </Typography>
              <ProjectPanel/>
            </Box>
          </Box>

          {/* Section 5 */}
          <Box
            ref={sectionRefs[4]}
            minHeight="50vh"  // Full viewport height for section 3
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={isVisibleSection4 ? 'fade-in' : ''}
          >
            <Box className="section-content">
              <Typography variant="h6" component="h1" color="white">
                <span style={{ color: '#36ffe7' }}>04.</span> Get In Touch!
              </Typography>
              <Typography sx={{mt: 3}}variant="subtitle1" gutterBottom color="#36ffe7"><Link href="https://www.linkedin.com/in/aaronzsun/" color="#36ffe7" target="_blank" underline="hover">LinkedIn </Link> </Typography>
              <Typography variant="subtitle1" gutterBottom color="#36ffe7"><Link href="https://github.com/aaronzsun" color="#36ffe7" target="_blank" underline="hover">GitHub </Link> </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
