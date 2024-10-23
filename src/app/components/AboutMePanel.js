import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Correct import for Grid2

const AboutMePanel = () => {
  return (
    <Box sx={{ maxWidth: '720px', mx: 'auto' }}>
      <Grid2 container spacing={3} alignItems="flex-start">
        {/* Text Section */}
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ mr: 2, mt: 4 }}>
          <Typography variant="subtitle2" color="#afafaf">
            I graduated from Harvard in Math and CS in May 2024 before moving out to the Bay. From academia to industry to finance,
            I&apos;ve built and deployed code to tackle all sorts of problems. I love working with all parts of the technical stack, 
            whether that be manipulating data, building + integrating backend and frontend, or putting it all together to create scalable applications. When I&apos;m offline,
            you can usually find me playing soccer, chugging beer, or cooking whatever yummy recipe I saw on YouTube that day.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="#afafaf"> Some technologies I&apos;ve been working with recently:</Typography>
            <Box component="ul" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1, pl: 2 }}>
              <Typography component="li" variant="body2" color="#afafaf"><span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> JavaScript</Typography>
              <Typography component="li" variant="body2" color="#afafaf"><span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> React</Typography>
              <Typography component="li" variant="body2" color="#afafaf"><span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> OpenAI API</Typography>
              <Typography component="li" variant="body2" color="#afafaf"><span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> TypeScript</Typography>
              <Typography component="li" variant="body2" color="#afafaf"><span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Python</Typography>
              <Typography component="li" variant="body2" color="#afafaf"><span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Three.js</Typography>
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
