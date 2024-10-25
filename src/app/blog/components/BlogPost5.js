"use client"

import { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const BlogPost5 = () => {
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
          <Typography variant="h6" component="span" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' }, fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', mr: 1 }}>
            2024 Sep 27:
          </Typography>
            A Collection of Random Quotes
        </Typography>
      </Box>

      {/* Blog Post Content that expands and collapses */}
      <Collapse in={isExpanded}>
        <Box sx={{ marginTop: 2, paddingLeft: '32px', pb: 4 }}>  {/* Align with title */}
          <Typography variant="body1" sx={{ color: '#afafaf' }}>
            There&apos;s a lot of quotes I really like. Some help me think about life or the world, and some are just funny (if you can&apos;t tell, I really like
            Calvin and Hobbes). <br/><br/><br/>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf' }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ marginRight: 1, color: '#afafaf' }}
                    >
                    &quot;If a pig could give his mind to anything, then he would not be a pig.&quot; <br/><br/>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7' }}>
                        - Charles Dickens
                    </Typography>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 6 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ marginRight: 1, color: '#afafaf' }}
                    >
                        &quot;There are only so many seats open in my life, and I don&apos;t want to let my heart be swayed by anyone who&apos;s not sitting in one of them. <br/>
                        Is that mean? <br/>
                        Of course, there are also people like you who bring their own seat and sit down.&quot; <br/><br/>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7' }}>
                        - Nobara Kugisaki
                    </Typography>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 6 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ marginRight: 1, color: '#afafaf' }}
                    >
                        &quot;Someone who is a friend to everyone is an enemy to himself.&quot; <br/><br/>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7' }}>
                        - Mike Tyson (paraphrased)
                    </Typography>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 6 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                        variant="body1"
                        component="span"
                        sx={{ marginRight: 1, color: '#afafaf' }}
                        >
                        &quot;Yesterday is history, <br/>
                        tomorrow is a mystery, <br/>
                        and today is a gift. <br/>
                        That is why they call it the present.&quot; <br/><br/>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7' }}>
                        - Master Oogway (but I think Bill Keane first)
                    </Typography>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 6 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ marginRight: 1, color: '#afafaf' }}
                    >
                        &quot;Day by Day, Nothing Seems to Change, But Pretty Soon... Everything&apos;s Different.&quot; <br/><br/>
                        &quot;It&apos;s Not Denial. I&apos;m Just Selective About the Reality I Accept.&quot; <br/><br/>
                        &quot;It&apos;s a magical world, Hobbes, ol&apos; buddy... Let&apos;s go exploring!”&quot; <br/><br/>
                        &quot;Scientific Progress Goes &apos;Boink&apos;&quot; <br/><br/>
                        &quot;I&apos;m significant, screamed the dust speck.&quot; <br/><br/>
                        &quot;You can&apos;t just turn on creativity like a faucet. You have to be in the right mood. <br/>
                        What mood is that? <br/>
                        Last-minute panic.&quot; <br/><br/>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7' }}>
                        - Bill Watterson (from Calvin and Hobbes)
                    </Typography>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 6 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ marginRight: 1, color: '#afafaf' }}
                    >
                    &quot;A person often meets his destiny on the road he took to avoid it.&quot; <br/><br/>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7' }}>
                        - Jean de le Fontaine
                    </Typography>
                    </Typography>
                </Box>
            </Box>    
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BlogPost5;
