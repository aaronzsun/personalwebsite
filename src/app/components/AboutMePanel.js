import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; 
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const AboutMePanel = () => {
  return (
    <Box sx={{ mx: 'auto' }}>
      <Grid2 container spacing={3} alignItems="flex-start">
        {/* Text Section */}
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ mr: 2, mt: 2 }}>
            <Typography variant="subtitle2" component="h1" color="#afafaf">
            <Box component="p" sx={{ mb: 2 }}>
                I graduated from Harvard in Math and CS in May 2024 before moving out to the Bay. From academia to industry to finance,
                I&apos;ve built and deployed code to tackle all sorts of problems. I love working with all parts of the technical stack, 
                whether that be manipulating data, building and integrating backend and frontend frameworks, or putting it all together to create scalable applications.
            </Box>
            <Box component="p">
                When I&apos;m offline, you can usually find me playing soccer, exploring San Francisco, or cooking whatever yummy recipe I saw on YouTube that day. 
                In case you&apos;re wondering, that&apos;s a picture of me next to the Broad Street Pump, the source of the London Cholera epidemic of 1854 
                (epidemiology nerds know what I&apos;m talking about). 
            </Box>
            </Typography> 
            <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="#afafaf" sx={{ mb: 2 }}> Some technologies I&apos;ve been messing with recently:</Typography>
            <Box component="ul" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1, pl: 2, listStyleType: 'none' }}>
                <Typography component="li" variant="body2" color="#afafaf" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-iosevka), monospace' }}>
                <ArrowRightIcon sx={{ color: '#36ffe7', marginRight: '5px'}} /> JavaScript
                </Typography>
                <Typography component="li" variant="body2" color="#afafaf" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-iosevka), monospace' }}>
                <ArrowRightIcon sx={{ color: '#36ffe7', marginRight: '5px' }} /> React
                </Typography>
                <Typography component="li" variant="body2" color="#afafaf" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-iosevka), monospace' }}>
                <ArrowRightIcon sx={{ color: '#36ffe7', marginRight: '5px' }} /> OpenAI API
                </Typography>
                <Typography component="li" variant="body2" color="#afafaf" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-iosevka), monospace' }}>
                <ArrowRightIcon sx={{ color: '#36ffe7', marginRight: '5px' }} /> TypeScript
                </Typography>
                <Typography component="li" variant="body2" color="#afafaf" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-iosevka), monospace' }}>
                <ArrowRightIcon sx={{ color: '#36ffe7', marginRight: '5px' }} /> Python
                </Typography>
                <Typography component="li" variant="body2" color="#afafaf" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-iosevka), monospace' }}>
                <ArrowRightIcon sx={{ color: '#36ffe7', marginRight: '5px' }} /> Three
                </Typography>
            </Box>
            </Box>
        </Grid2>

        {/* Image Section */}
        <Grid2 size={{ xs: 12, sm: 5 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Box 
            sx={{ 
              position: 'relative', 
              maxWidth: '300px', 
              margin: { xs: '10px auto', md: '0 auto' },  // Center the image on mobile, align left on desktop
              '&:hover .image-border': { transform: 'translate(10px, 10px)' },
              '&:hover img': { filter: 'grayscale(0)', transform: 'scale(1.05)' },
            }}
          >
            {/* The image */}
            <Box 
              component="img" 
              src="profile.png"  // Correct path for the image
              alt="Your Name" 
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px', 
                filter: 'grayscale(100%) sepia(1) hue-rotate(100deg) saturate(1)', 
                transition: '0.3s ease-in-out', 
                position: 'relative', 
                zIndex: 2 
              }} 
            />

            {/* The border effect */}
            <Box 
              className="image-border" 
              sx={{ 
                position: 'absolute', 
                top: '20px', 
                left: '20px', 
                width: '100%', 
                height: '100%', 
                border: '2px solid #36ffe7', 
                borderRadius: '8px', 
                zIndex: 1, 
                transition: '0.3s ease-in-out',
                transform: 'translate(0px, 0px)' 
              }} 
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AboutMePanel;
