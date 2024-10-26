import { Box, Typography, Button } from '@mui/material';
import ProjectDisplayWebsite from './ProjectDisplayWebsite';
import ProjectDisplayMobileWebsite from './ProjectDisplayMobileWebsite';
import ProjectDisplayHub from './ProjectDisplayHub';
import ProjectDisplayMobileHub from './ProjectDisplayMobileHub';
import ProjectDisplaySpotifyRec from './ProjectDisplaySpotifyRec';
import ProjectDisplayMobileSpotifyRec from './ProjectDisplayMobileSpotifyRec';

const ProjectDisplay = () => {
  return (
    <Box>
        <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
            <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>03.</span> Stuff I&apos;ve Built
        </Typography>
        <Box
        sx={{
            display: { xs: 'none', sm: 'block', md: 'block' }, // Hidden on small screens, visible on medium screens
            mt: 10,
        }}
        >
            <ProjectDisplayHub/>
        </Box>
        <Box
        sx={{
            display: { xs: 'block', sm: 'none', md: 'none' }, // Hidden on small screens, visible on medium screens
        }}
        >
            <ProjectDisplayMobileHub/>
        </Box>
        <Box sx={{ mb: { xs: 6, sm: 6, md: 10 } }}/>
        <Box
        sx={{
            display: { xs: 'none', sm: 'block', md: 'block' }, // Hidden on small screens, visible on medium screens
        }}
        >
            <ProjectDisplaySpotifyRec/>
        </Box>
        <Box
        sx={{
            display: { xs: 'block', sm: 'none', md: 'none' }, // Hidden on small screens, visible on medium screens
        }}
        >
            <ProjectDisplayMobileSpotifyRec/>
        </Box>
        <Box sx={{ mb: { xs: 6, sm: 6, md: 10 } }} />
        <Box
        sx={{
            display: { xs: 'none', sm: 'block', md: 'block' }, // Hidden on small screens, visible on medium screens
        }}
        >
            <ProjectDisplayWebsite/>
        </Box>
        <Box
        sx={{
            display: { xs: 'block', sm: 'none', md: 'none' }, // Hidden on small screens, visible on medium screens
        }}
        >
            <ProjectDisplayMobileWebsite/>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="subtitle1" component="h2" color="white" sx={{ fontFamily: 'var(--font-iosevka), monospace', mt:  { xs: 8, sm: 8, md: 8 }, fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem' }}}>
                Some things I built with Three.JS
            </Typography>
            <Typography variant="subtitle2" component="h2" color="#36ffe7" sx={{ fontFamily: 'var(--font-iosevka), monospace', mb: 5, fontSize: { xs: '0.7rem', sm: '0.7rem', md: '0.9rem' }}}>
                [3D Renderings]
            </Typography>
            <Button 
                component="a" 
                href="/three" 
                variant="outlined" 
                size="large"
                sx={{
                mb: 6,
                textDecoration: 'none',
                fontFamily: 'var(--font-iosevka), monospace',
                width: { xs: "250px", sm: "250px", md: "250px" },
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
                Three.JS Playground
            </Button>
        </Box> 
    </Box>
  );
};

export default ProjectDisplay;




