import { Box, Typography, Button, Link, CardMedia } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectDisplayWebsite = () => {
  const title = "Personal Site";
  const description = "My personal website- and where you are right now. Built entirely from scratch and deployed on Vercel. Responsive design for mobile phones and tablets as well. Took some design inspirations from Brittany Chiang, but all code is mine.";
  const technologies = ["React", "JavaScript", "MUI", "Three.JS", "NextJS"]
  const imageSrc = "mywebsite.png"
  const githubLink = "https://github.com/aaronzsun/personalwebsite/"
  const liveLink = "https://github.com/aaronzsun/personalwebsite/"

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
            '&:hover': { filter: 'grayscale(10%) sepia(0.1) hue-rotate(20deg) saturate(1)', cursor:'pointer'},
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
          Web Design
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
              sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#afafaf', fontSize: '0.85rem' }}
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
