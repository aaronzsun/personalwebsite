import { Box, Typography, Button } from '@mui/material';
import ProjectDisplayWebsite from './ProjectDisplayWebsite';
import ProjectDisplayMobileWebsite from './ProjectDisplayMobileWebsite';
import ProjectDisplayHub from './ProjectDisplayHub';
import ProjectDisplayMobileHub from './ProjectDisplayMobileHub';
import ProjectDisplaySpotifyRec from './ProjectDisplaySpotifyRec';
import ProjectDisplayMobileSpotifyRec from './ProjectDisplayMobileSpotifyRec';
import ProjectDisplayThree from './ProjectDisplayThree';
import ProjectDisplayMobileThree from './ProjectDisplayThreeMobile';


const ProjectDisplay = () => {
  return (
    <Box>
        <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
            <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>03.</span> Stuff I&apos;ve Built
        </Typography>
        <Box
        sx={{
            display: { xs: 'none', sm: 'block', md: 'block' }, // Hidden on small screens, visible on medium screens
        }}
        >
            <ProjectDisplayThree/>
        </Box>
        <Box
        sx={{
            display: { xs: 'block', sm: 'none', md: 'none' }, // Hidden on small screens, visible on medium screens
        }}
        >
            <ProjectDisplayMobileThree/>
        </Box>
        <Box sx={{ mb: { xs: 6, sm: 6, md: 10 } }}/>
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
    </Box>
  );
};

export default ProjectDisplay;




