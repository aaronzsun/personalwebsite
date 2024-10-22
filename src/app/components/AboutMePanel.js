import React from 'react';
import { Box, Paper, Typography, Link } from '@mui/material';

const ProjectPanel = () => {
  return (
    <Box>
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
  );
};

export default ProjectPanel;
