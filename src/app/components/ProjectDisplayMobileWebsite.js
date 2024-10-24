import { Box, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectDisplayMobileWebsite = () => {
  const title = "My Personal Site";
  const description = "My personal website- and where you are right now. Built entirely from scratch and deployed on Vercel. Responsive design for mobile phones and tablets as well. Took some design inspirations from Brittany Chiang, but all code is mine.";
  const technologies = ["React", "JavaScript", "MUI", "Three.JS", "NextJS"]
  const imageSrc = "mywebsite.png"
  const githubLink = "https://github.com/aaronzsun/personalwebsite/"
  const liveLink = "https://github.com/aaronzsun/personalwebsite/"

  return (
    <Box
      sx={{
        position: 'relative',
        width: '90%',
        padding: 2,
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',  // Stack items in a column
        justifyContent: 'space-between',  // Distribute space between content
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        textAlign: 'left',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Dark overlay
          zIndex: 0,
        },
      }}
    >
      {/* Project Title */}
      <Typography
        variant="h5"
        component="h3"
        sx={{ fontWeight: 'bold', mb: 2, position: 'relative', zIndex: 1, color: "#36ffe7"}}
      >
        {title}
      </Typography>

      {/* Project Description */}
      <Typography
        variant="body1"
        sx={{ 
          mb: 3,
          position: 'relative', 
          zIndex: 1,
          color: "#afafaf",
          fontSize: '0.8rem'
         }}
      >
        {description}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      {/* Technologies */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2, position: 'relative', zIndex: 1 }}>
        {technologies.map((tech, index) => (
          <Typography key={index} variant="body2" sx={{ color: '#afafaf', fontSize: '0.85rem' }}>
            {tech}
          </Typography>
        ))}
      </Box>

      {/* Links */}
      <Box sx={{ display: 'flex', gap: 2, position: 'relative', zIndex: 1, mb: 1 }}>
        {githubLink && (
          <Link href={githubLink} target="_blank" rel="noopener noreferrer" sx={{ color: '#36ffe7', '&:hover': { opacity: 0.7 } }}>
            <GitHubIcon />
          </Link>
        )}
        {liveLink && (
          <Link href={liveLink} target="_blank" rel="noopener noreferrer" sx={{ color: '#36ffe7', '&:hover': { opacity: 0.7 } }}>
            <LaunchIcon />
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default ProjectDisplayMobileWebsite;
