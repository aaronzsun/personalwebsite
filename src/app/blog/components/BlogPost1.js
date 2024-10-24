"use client"

import { useState } from 'react';
import { Box, Typography, Collapse, Link } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const BlogPost1 = () => {
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
          <Typography variant="h6" component="span" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' }, fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', mr: 1 }}>2023 Dec 10:</Typography>
           Intuitive Design: Balancing Simplicity & Functionality
        </Typography>
      </Box>

      {/* Blog Post Content that expands and collapses */}
      <Collapse in={isExpanded}>
        <Box sx={{ marginTop: 2, paddingLeft: '32px' }}>  {/* Align with title */}
          <Typography variant="body1" sx={{ color: '#afafaf' }}>
            Every web developer knows exactly what I&apos;m talking about here- one of, if not the most difficult &quot;tradeoffs&quot; to consider
            when designing any user-facing application. Building an intuitive design isn&apos;t necessarily that challenging: a pure HTML page for a portfolio
            is definitely intuitive, since all the content is right there for the user to consume. But no one wants to look at Times New Roman font plastered
            across an asylum-white background with no real formatting. The real issue comes how to display content- how we choose what to display and how we
            nudge users in the right direction when it comes to navigating the display. <br/> <br/>
            Having designed eight iterations (maybe nine) of my own <Link
                href="https://aaronzsun.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                color: '#36ffe7',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline', 
                },
                }}
            >
                personal website
            </Link>  at this point, I&apos;ve definitely fell into the pitfall of trying to design 
            methods of content navigation that provides complex control of content that also doesn&apos;t need a user manual to be able to understand. Take
            these two menus for example.
            <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },  // Column on mobile, row on larger screens
                justifyContent: 'space-between',
                gap: 2,
                width: '100%',
                margin: '0 auto',
                mt: 4,
                mb: 4,
            }}
            >
            <Box
                component="img"
                src="/simplemenu.png"
                alt="simplemenu"
                sx={{ maxWidth: { xs: '90%', sm: '90%', md: '48%' }, height: 'auto' }}
            />
            <Box
                component="img"
                src="/fancymenu.png"
                alt="fancymenu"
                sx={{ maxWidth: { xs: '90%', sm: '90%', md: '48%' }, height: 'auto' }}
            />
            </Box>
            On one hand, we have a simple top navigation bar using CSS. In terms of intuition, it really couldn&apos;t be better. It&apos;s properly
            labeled as CSS Nav, and each navigation link describes exactly what clicking each tab will do. BUT... it&apos;s not very nice to look at. 
            On the other hand, we have a fancier expandable menu with three vertical dots. Clicking on it then produces three circular tabs with icons
            that should indicate what clicking each tab should do. Yeah, it looks really cool- and the expanding feature helps us save space- but someone
            unfamiliar with the site would have no idea what each of these buttons would do. So which one is better? Well, unfortunately, neither is really
            better or worse. However, we can take concepts from each of these menus to apply to our general design principles! <br/> <br/>
            The simple menu is not very visually appealing and clutters the top of our website, yet it does exactly what it says which makes it super easy to use.
            The fancier menu is super cool to look at and declutters our site, but hard to understand. So what would make a menu great? One, every part of the
            menu should do exactly what it says. There&apos;s no need for fancy icons or hieroglyphs that make using our menu more difficult. That doesn&apos;t
            mean that we can&apos;t make our menu visually appealing though. Two, we shouldn&apos;t include anything to our menu that doesn&apos;t need to be there. 
            We don&apos;t need a label for the menu if it&apos;s functionality is intuitive, and we also don&apos;t need to even see the menu if someone&apos;s 
            reading content on the page and has no plans of navigating. A good menu should be properly labeled so each navigation option is clearly 
            communicated, not have any additional display that isn&apos;t necessarily, and only be visible when someone actually needs it (or be simple
            to find if someone were to want to use it). <br/><br/>
            While we only examined a simple menu in this case, principles like these can and should be applied to all parts of web design. Everything on
            your page or application should do exactly what it says. Anything that doesn&apos;t need to be there really just shouldn&apos;t be there. When 
            it&apos;s not there and someone might need it, they should be able to find it quickly. And obviously, we have to make it visually
            appealing too. Easier said than done though. If you&spo;re a new web developer and want to take a look at some designs that I think apply
            these principles well, definitely check out <Link
                href="https://mui.com/material-ui/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                color: '#36ffe7',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline', 
                },
                }}
            >
                Material-UI
            </Link> components. Happy coding!
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BlogPost1;
