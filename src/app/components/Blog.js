import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';

const Blog = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}>
        <Typography variant="subtitle1" component="h2" color="#afafaf" sx={{ mb: 5, mt:  { xs: 2, sm: 4, md: 4 }, fontSize: { xs: '0.85rem', sm: '1.1rem', md: '1.1rem' }}}>
            Sometimes I talk about things that are interesting. <br/> Sometimes I just ramble on about my thoughts. <br/> Sometimes I write cool & informative articles.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/blog" sx = {{
                textDecoration: 'none'
            }}>
                <Button 
                    component="a" 
                    variant="outlined" 
                    size="large"
                    sx={{
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
                    My Blog
                </Button>
            </Link>
        </Box> 
    </Box>
  );
};

export default Blog;
