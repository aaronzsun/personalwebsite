import React from 'react';
import { Box, Paper, Typography, Link } from '@mui/material';

const ProjectPanel = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={6} sx={{ mt: 3 }}>
      {/* First Paper */}
      <Box flex="1 1 calc(33.333% - 16px)" minWidth="250px" mb={3}>
        <Paper elevation={3} sx={{ padding: 2, aspectRatio: '1 / 0.75', backgroundColor: '#4f4f4f' }}>
          <Typography variant="subtitle1" gutterBottom color="#36ffe7">Hub Social Network | <Link href="https://github.com/aaronzsun/hub" color="#36ffe7" target="_blank" underline="hover">GitHub </Link> </Typography>
          <Typography variant="body1" color="#afafaf">Hub is a social network I created at Harvard. It allows users to aggregate their
            different social media accounts into one platform and connect with each other. It integrates a Flask backend with a pure
            HTML/CSS/JS frontend. 
          </Typography>
        </Paper>
      </Box>

      {/* Second Paper */}
      <Box flex="1 1 calc(33.333% - 16px)" minWidth="250px" mb={3}>
        <Paper elevation={3} sx={{ padding: 2, aspectRatio: '1 / 0.75', backgroundColor: '#4f4f4f' }}>
        <Typography variant="subtitle1" gutterBottom color="#36ffe7">SVM Visualizer | <Link href="https://github.com/aaronzsun/ml-visualizer" color="#36ffe7" target="_blank" underline="hover">GitHub </Link> </Typography>
        <Typography variant="body1" color="#afafaf"> SVM Visualizer was created at Stanford&apos;s 2021 TreeHacks Hackathon to help students better under 
            support vector machines and their underlying algorithms. The project won two top prizes: Most Sustainable Hack and Best Use of Data Visualization.
        </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProjectPanel;
