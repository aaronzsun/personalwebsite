import { Box, Typography, Button, Link, CardMedia } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectDisplayWebsite = () => {
  const title = "Hub Social Network";
  const description = "Twitter, Instagram, Facebook, BeReal... overwhelmed by the sheer number of social media platforms? Connect and share them all with your friends in one place with Hub- built with all the social functionality of your favorite sites.";
  const technologies = ["Flask", "HTML", "CSS", "JavaScript", "SQL"]
  const imageSrc = "hub.png"
  const githubLink = "https://github.com/aaronzsun/hub"
  const liveLink = "https://github.com/aaronzsun/hub"

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        mb: 6,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          width: "60%",
          display: 'block', 
        }}
      >
        <CardMedia
          component="img"
          image={imageSrc}
          alt={title}
          position="absolute"
          sx={{
            borderRadius: '4px',
            objectFit: 'cover',
            minWidth: '55%',
            left: 0,
            height: '100%',
            filter: 'grayscale(100%) sepia(1) hue-rotate(120deg) saturate(1)',
            transition: '0.3s ease-in-out', 
            '&:hover': { filter: 'grayscale(0)', cursor:'pointer'},
          }}
        />
      </Box>

      {/* Project Information */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          minWidth: '50%',
          width: '50%',
          position: 'absolute',
          right: 0,
          color: 'white',
          zIndex: 1,
          padding: 2,
          borderRadius: '2px',
        }}
      >
        <Typography variant="subtitle2"
          component="h3"
          sx={{
            fontFamily: 'var(--font-iosevka), monospace',
            fontWeight: 'bold',
            color: '#36ffe7',
            mb: 1,
          }}>
          Full-Stack
        </Typography>
        {/* Project Title */}
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {/* Project Description */}
        <Box
        sx={{
          midWidth: '100%',
          width: '100%',
          minHeight: '100%',
          height: '100%',
          backgroundColor: 'rgba(36, 37, 37, 0.85)',
          zIndex: 2,
          padding: 2,
          borderRadius: '2px',
        }}
        >
          <Typography variant="body1" component="p" sx={{
            fontSize: '0.85rem',
            color: '#afafaf',
            textAlign: 'right',
          }}>
            {description}
          </Typography>
        </Box>
        {/* Technologies */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, mt: 2 }}>
          {technologies.map((tech, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: '#afafaf', fontSize: '0.85rem', fontFamily: 'var(--font-iosevka), monospace' }}
            >
              {tech}
            </Typography>
          ))}
        </Box>

        {/* Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#36ffe7', '&:hover': { opacity: 0.7 } }}
            >
              <GitHubIcon />
            </Link>
          )}
          {liveLink && (
            <Link
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#36ffe7', '&:hover': { opacity: 0.7 } }}
            >
              <LaunchIcon />
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDisplayWebsite;
