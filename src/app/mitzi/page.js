"use client";

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, Link, TextField, Avatar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"
import localFont from "next/font/local";
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';
// import Head from 'next/head';


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

const mitziAvatar = '/mitzi.png';


export default function Mitzi() {
  const [loading, setLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  const [showMenu, setShowMenu] = useState(false); // Initially offscreen
  const lastScrollY = useRef(0);

  // Generate session ID if it doesn’t exist
  if (!localStorage.getItem('mitziSessionId')) {
    localStorage.setItem('mitziSessionId', uuidv4());
  }
  const sessionId = localStorage.getItem('mitziSessionId');

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

  const [messages, setMessages] = useState([
    { sender: 'Mitzi', text: "Hi there! I'm Mitzi. How can I help today?" } // Initial message
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput) return;
  
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);
  
    try {
      const response = await axios.post('/mitzi/api/openai', {
        message: userInput,
        sessionId, // Send session ID with each request
      });
      setMessages([...newMessages, { sender: 'Mitzi', text: response.data.text }]);
    } catch (error) {
      console.error('Error communicating with Mitzi:', error);
      setMessages([...newMessages, { sender: 'Mitzi', text: "Sorry! I'm not feeling great right now :(" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatBoxRef = useRef(null); 

    // Auto-scroll to bottom when messages update
    useEffect(() => {
    if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    }, [messages]);

  return (
    <>
      <Helmet>
        <title>Mitzi</title>
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
                <Typography variant="h3" component="h1" sx={{ fontFamily: 'var(--font-iosevka), monospace', fontWeight: "500", mb: { xs: 3, sm: 2, md: 2}, fontSize: { xs: '0.8rem', sm: '1.2rem', md: '1.2rem' }  }}>
                  <span style={{ color: '#36ffe7' }}> Hello World! </span>
                </Typography>
                <Typography variant="h3" component="h1" sx={{ fontWeight: "300", mb: { xs: 0, sm: 2, md: 2}, fontSize: { xs: '2.5rem', sm: '4rem', md: '4rem' }  }}>
                    I&apos;m <span style={{ textDecoration: 'line-through' }}>Aaron</span> Mitzi.
                </Typography>
                <Typography variant="subtitle1" color="#afafaf" sx={{ mt: { xs: 3, sm: 4, md: 4 }, mb: { xs: 2, sm: 0, md: 0}, fontSize: { xs: '0.7rem', sm: '1rem', md: '1rem' } }}>
                  I&apos;m a chat bot and friend of Aaron!
                </Typography>
                <Button 
                  variant="outlined" 
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
                  Get Chatting
                </Button>
              </Box>
            </Box>
            <Box
              ref={sectionRef}
              minHeight="80vh"
              width="100%"
              sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}
            >
              <Box className="section-content" sx={{mb: 10}}>
              <Box>
                <Box   ref={chatBoxRef} className="chat-window" sx={{ maxHeight: '60vh', overflowY: 'auto', pl: 1, pr: 2, pt: 2, pb: 2, mb: 2 }}>
                    {messages.map((message, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, flexDirection: message.sender === 'user' ? 'row-reverse' : 'row' }}>
                    {message.sender === 'Mitzi' && (
                      <Avatar
                        alt="Mitzi Avatar"
                        src={mitziAvatar}
                        sx={{ width: 30, height: 30, mr: message.sender === 'user' ? 0 : 2, ml: message.sender === 'Mitzi' ? 2 : 0 }}
                      />
                    )}
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: message.sender === 'user' ? 'right' : 'left',
                        color: message.sender === 'user' ? '#36ffe7' : 'white',
                        fontWeight: '300',
                        maxWidth: '70%',
                        bgcolor: 'transparent',
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Box>
                    ))}
                </Box>
                <TextField
                    fullWidth
                    placeholder="Type a message..."
                    autoComplete='off'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isLoading) {
                          e.preventDefault(); // Prevent newline from being added
                          handleSendMessage(); // Call the send message function
                        }
                      }}
                    sx={{
                        input: { 
                        color: 'white', 
                        },
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#36ffe7',
                        },
                        '&:hover fieldset': {
                            borderColor: '#36ffe7',
                        },
                        '&.Mui-focused fieldset': {  // Remove blue highlight on focus
                            borderColor: '#36ffe7',
                            outline: 'none',
                        }
                        },
                        mb: 2,
                    }}
                />
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
