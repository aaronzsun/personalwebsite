import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Contact = () => {
  return (
    <Box sx={{ mx: 'auto', mt: 3 }}>
      <Typography variant="subtitle1" component="h1" color="#afafaf" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' } }}>
        I&apos;m currently looking for new opportunities- shoot me an email or message me on LinkedIn if you&apos;d like to chat!
      </Typography>
      <Button 
        variant="outlined" 
        component="a" 
        href="https://linkedin.com/in/aaronzsun" 
        target="_blank"
        rel="noopener noreferrer"
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
        LinkedIn
      </Button>
      <Button 
        variant="outlined" 
        component="a" 
        href="mailto:aaronsun2001@gmail.com" 
        target="_blank"
        rel="noopener noreferrer"
        size="large"
        sx={{
            fontFamily: 'var(--font-iosevka), monospace',
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
        Email
      </Button>          
    </Box>
  );
};

export default Contact;
