import { Box, Typography, Link, CardMedia } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectDisplayThree = () => {
  const title = "Three.JS Playground";
  const description = "I really like things when websites look cool, so I've been working a lot with Three. If you want check out some of the stuff I've made, you can check out my virtual, interactive playground. Feel free to take anything you like and add it to your website!";
  const technologies = ["React", "Three", "Fiber", "Ammo" ]
  const imageSrc = "threeplayground.png"
  const githubLink = "https://github.com/aaronzsun/personalwebsite/tree/main/src/app/three"
  const liveLink = "https://aaronzsun.com/three"

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
        <Typography variant="subtitle2"
          component="h3"
          sx={{
            fontFamily: 'var(--font-iosevka), monospace',
            fontWeight: 'bold',
            color: '#36ffe7',
            mb: 1,
          }}>
          3D Graphics
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

export default ProjectDisplayThree;
