import { Box, Typography, Button, Link, CardMedia } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectDisplayWebsite = () => {
  const title = "Better Spotify Recs";
  const description = "Sick of Spotify giving you terrible song recommendations? Get personalized information on your profile, as well as recommendations for songs and artists based on your profile from OpenAI.";
  const technologies = ["React", "Spotify API", "OpenAI API", "Django" ]
  const imageSrc = "spotifyrec.png"
  const githubLink = "https://github.com"
  const liveLink = "https://github.com"

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
      {/* Project Information */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minWidth: '50%',
          width: '50%',
          color: 'white',
          zIndex: 2,
          padding: 2,
          pl: 0,
          borderRadius: '2px',
        }}
      >
        {/* Project Title */}
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: '#36ffe7',
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
            textAlign: 'left',
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
              sx={{ color: '#afafaf', fontSize: '0.85rem' }}
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
      
      {/* Image Section */}
      <Box
        sx={{
          minWidth: '60%',
          width: '60%',
          position: 'absolute',
          right: 0,
          color: 'white',
          zIndex: 0,
          padding: 2,
          borderRadius: '2px',
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
            right: 0,
            height: '100%',
            filter: 'grayscale(100%) sepia(1) hue-rotate(120deg) saturate(1)',
            transition: '0.3s ease-in-out', 
            '&:hover': { filter: 'grayscale(10%) sepia(0.1) hue-rotate(20deg) saturate(1)', cursor:'pointer'},
          }}
        />
      </Box>
    </Box>
  );
};

export default ProjectDisplayWebsite;
