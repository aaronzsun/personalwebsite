"use client"

import { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const BlogPost2 = () => {
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
        <Typography variant="h6" sx={{ color: 'white' }}>
          <Typography variant="h6" component="span" sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', mr: 1 }}>2024 Sep 17:</Typography>
            Some Thoughts on San Francisco vs. New York City
        </Typography>
      </Box>

      {/* Blog Post Content that expands and collapses */}
      <Collapse in={isExpanded}>
        <Box sx={{ marginTop: 2, paddingLeft: '32px' }}>  {/* Align with title */}
          <Typography variant="body1" sx={{ color: '#afafaf' }}>
            Just last month, I moved from New York City to San Francisco- the two giants of &quot;where I want to live&quot; for recent college
            graduates like myself. Having bounced between Boston and New York City for a couple years during college, I think I have a decent
            idea of what the New York life really is about, and I just wanted to write down my thoughts. <br/><br/>
            Starting off, San Francisco has been great. I love playing soccer on the weekends, walking around the city and being within a quarter-mile
            from a park, or just staring off into the open ocean. The outdoor activities have honestly been so refreshing. The foods also pretty great too: 
            there&apos;s a ton of fresh and healthy food everywhere in the city and Irving St has been a treasure trove of delicious asian food. I do
            really dispise walking uphill though. I have a couple friends and family in the bay and its been super nice hanging out with them. <br/><br/>
            When it comes to New York, there are some really great things about being in the metropolitan center of the world. It feels like everybody is there-
            almost all my college friends found their way to New York one way or another and its definitely an oasis for social butterflies. The food
            is delicious: and as much as I don&apos;t want to admit it, the food in New York City is definitely on another level. Personally, I&apos;m not a huge
            fan of fine-dining though, so San Francisco still checks every box for me. <br/><br/> 
            Something I did feel in New York was this sense of isolation despite
            being amongst so much. A lot of my friends always had their calendars packed with events, shows, or bars they wanted to check out, but after being
            there for a little while I felt a bit weird that those things didn&apos;t really interest me. <br/><br/>
            I didn&apos;t realize why I felt that way until I moved to San Francisco. Being outside in the sunny weather and surrounded by nature made me realize
            that what I really crave is the outdoors, which was something New York could never really satisfy for me (outside of some great pickup basketball games
            at the local city courts). Personally, I haven&apos;t ever been interested in fashion or fine dining or even seeing my favorite artists- I really
            just like spending time with a couple close friends in a quiet and relaxing place. I&apos;ve come to accept that the culture of New York maybe just
            wasn&apos;t for me, which was difficult for a while because it felt like everyone else was so drawn to it. <br/><br/>
            That being said, I really do love New York and everyone there. It&apos;s a great place to be, but if you&apos;re like me, you definitely have to
            be prepared to experience life from a different perspective. If you do plan on moving or visiting New York, I think these are some must-hit spots: <br/><br/>
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
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    Lucali:
                    </Typography>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ display: 'inline', color: '#afafaf' }}
                    >
                    The most delicious pizza I&apos;ve ever had. Run by Mark Iocono in Carroll Gardens, Brooklyn. But be prepared to wait and you have to line up early just to get your name down.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2 }}>
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
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    Kimura:
                    </Typography>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ display: 'inline', color: '#afafaf' }}
                    >
                    My favorite restaurant EVER is a Sukiyaki place in Kyoto, JP called Ginsui. This was 99% as good.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2 }}>
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
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    Joe&apos;s:
                    </Typography>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ display: 'inline', color: '#afafaf' }}
                    >
                    The one in Father Demo Square. It&apos;s definitely overpriced and New Yorkers will hate me for this but its my favorite quick slice.
                    </Typography>
                </Box>
            </Box>            
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BlogPost2;
