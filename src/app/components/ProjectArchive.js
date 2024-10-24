import { Box, Grid, Card, CardContent, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of Project One. Built with React, Node.js, and MongoDB.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/yourrepo1',
    liveLink: 'https://projectone.com',
  },
  {
    title: 'Project Two',
    description: 'A brief description of Project Two. Built with Next.js and Firebase.',
    technologies: ['Next.js', 'Firebase'],
    githubLink: 'https://github.com/yourrepo2',
    liveLink: 'https://projecttwo.com',
  },
  // Add more projects as needed
];

const OtherNoteworthyProjects = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#36ffe7', mb: 4 }}>
        Other Noteworthy Projects
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'rgba(36, 37, 37, 0.7)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ color: '#36ffe7', mb: 2 }}>
                  {project.title}
                </Typography>

                <Typography variant="body2" color="#afafaf" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>

                <Typography variant="caption" color="#dbdbdb" sx={{ mb: 2 }}>
                  {project.technologies.join(' · ')}
                </Typography>
              </CardContent>

              <Box sx={{ mt: 'auto', p: 2 }}>
                {project.githubLink && (
                  <IconButton href={project.githubLink} target="_blank" rel="noopener noreferrer" sx={{ color: '#36ffe7' }}>
                    <GitHubIcon />
                  </IconButton>
                )}
                {project.liveLink && (
                  <IconButton href={project.liveLink} target="_blank" rel="noopener noreferrer" sx={{ color: '#36ffe7' }}>
                    <LaunchIcon />
                  </IconButton>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OtherNoteworthyProjects;
