import React from 'react';
import { Box, Button, Link } from '@mui/material';

const NavMenu = () => {
  return (
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
  )
}

export default NavMenu;