"use client"

import { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const BlogPost4 = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      {/* Blog Post Title with Clickable Arrow and Text */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={toggleExpand}
      >
        {/* ArrowRightIcon rotates when expanded */}
        <ArrowRightIcon
          sx={{
            color: '#36ffe7',
            marginRight: '8px',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',  // Rotate the icon
            transition: 'transform 0.3s ease',  // Smooth transition for rotation
          }}
        />
        {/* Blog Post Title */}
        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' }, color: 'white' }}>
          <Typography variant="h6" component="span" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' }, fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', mr: 1 }}>2022 Oct 29:</Typography>
            I Don&apos;t Understand Halloween
        </Typography>
      </Box>

      {/* Blog Post Content that expands and collapses */}
      <Collapse in={isExpanded}>
        <Box sx={{ marginTop: 2, paddingLeft: '32px' }}>  {/* Align with title */}
          <Typography variant="body1" sx={{ color: '#afafaf' }}>
            Okay, I won&apos;t lie: Halloween was super fun as a kid. I liked dressing up as my favorite superhero and running around amassing a giant
            sack of candy. Also I got to stay up late. My parents took most of my candy the next day, though I still enjoyed the process. <br/><br/>
            But now, I realized I don&apos;t get Halloween at all. Firstly, it&apos;s interesting to me that every household just accepts this agreement 
            that they&apos;ll buy candy to give out to kids. Also, I know the US is trying to be healthier, but isn&apos;t giving kids literal
            giant sacks of sugar not a great idea? I would get it more if it was maybe one day where you go and eat the candy, but I&apos;ve seen
            how much candy kids get firsthand- it&apos;s definitely enough to last for months, if not years. Hopefully I won&apos;t be that one house giving
            out carrots when I&apos;m older though.
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BlogPost4;
