import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className={`tabpanel-content ${value === index ? 'fade-in-tabs' : ''}`}  // Apply fade-in-tabs class
      style={{ backgroundColor: 'transparent' }}  // Ensure the background is transparent
    >
      {value === index && (
        <Box sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 1, backgroundColor: 'transparent' }}>  {/* Set background to transparent */}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function VerticalTabsComponent() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'transparent',  // Set the Box background to transparent
        padding: 0,
        mt: 3,
      }}
    >
      <AppBar
        position="relative"
        className="resumeAppBar"
        elevation={0}
        sx={{
          bgcolor: 'transparent',  // Set AppBar background to transparent
          flexDirection: 'column',
          width: '100px'
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          textColor="inherit"
          className="resumeTabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#36ffe7',
              left: 0,
            },
          }}
          sx={{
            '.MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              alignItems: 'flex-start',
              padding: 2,
              color: '#36ffe7',
            },
            backgroundColor: 'transparent'  // Ensure Tabs have transparent background
          }}
        >
          <Tab label="OPTIVER" {...a11yProps(0)} />
          <Tab label="HUBSPOT" {...a11yProps(1)} />
          <Tab label="NIH" {...a11yProps(2)} />
          <Tab label="NASA" {...a11yProps(3)} />
          <Tab label="PAKIRA" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <Box className="resumeContent" sx={{ flexGrow: 1, backgroundColor: 'transparent' }}>  {/* Transparent background for content */}
        <TabPanel className="fade-in-tabs" value={value} index={0} dir={theme.direction}>
          <Typography className="resumePanel" variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1.2rem' } }}>
            Quantitative Trader Intern @{' '}
            <a 
              href="https://optiver.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              Optiver
            </a>
          </Typography>
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", sm: "15px", md: "20px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '1rem' } }}>
            Jul 2023 - Aug 2023
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Operated independent quantitative sim desk, generating ~$50k over 4 weeks of trading Tesla options.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Developed new quantitative trading strategies by analyzing historic market flow/liquidity data and S&P 500 index correlations with Tesla volatility, Sharpe ratio of 2.8 when backtested.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Gained in-depth understanding of the Black-Scholes Model (options pricing), game theory, and stochastic calculus through Optiver&apos;s trader education program.
          </Typography>
          
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={1} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1.2rem' } }}>
            Software Engineer Intern @{' '}
            <a 
              href="https://www.hubspot.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              HubSpot
            </a>
          </Typography>
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", m: "15px", md: "20px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '1rem' } }}>
            Jul 2022 - Aug 2022
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Led creation of Storybook-UI Packages Application, an interface that aggregates all storybook enabled packages at HubSpot and their relevant information, accessed by hundreds of engineers for internal development.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Developed Component Health UI alongside component tooling team, automatically providing developers with graded assessments of the compatibility of their Storybook-UI applications.
          </Typography>
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={2} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1.2rem' } }}>
            Research Fellow @{' '}
            <a 
              href="https://lhncbc.nlm.nih.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              NIH LHNCBC
            </a>
          </Typography>
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", m: "15px", md: "20px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '1rem' } }}>
            Feb 2021 - Aug 2021
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> With Dr. Clement McDonald, Scientific Director of the Lister Hill National Center and NIH Data Discovery Group.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Created EasyPATH, a syntax parsing library to convert human-written expressions into FHIRPath, increasing accessibility of healthcare informatics resources across 100+ platforms & medical institutions across the US.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Wrote machine learning scripts (TensorFlow) for large COVID-19 patient datasets to determine efficacy of treatments.
          </Typography>
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={3} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1.2rem' } }}>
            Research Intern @{' '}
            <a 
              href="https://www.jpl.nasa.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              NASA JPL
            </a>
          </Typography>
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", m: "15px", md: "20px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '1rem' } }}>
            June 2020 - August 2020
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> With Dr. Goldsmith, Group Director of the NASA JPL Structure of the Universe Division.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Developed python scripts to resolve foreground absorption issues in NASA spectroscopy data using procedural model generation & gaussian fitting.
          </Typography>
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={4} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontSize: { xs: '0.7rem', sm: '0.7rem', md: '1.2rem' } }}>
            Founding Software Engineer @{' '}
            <a 
              href="https://www.pakira.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              Pakira
            </a>
          </Typography>
          <Typography variant="body2" component="p" sx={{ color: '#afafaf',mb: { xs: "15px", m: "15px", md: "20px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '1rem' } }}>
            Jan 2020 - Jan 2021
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Co-Founding Software Engineer of Pakira, an online commodity trading platform to automate B2B transactions.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' }, color: '#afafaf' }}>
            <span style={{ color: '#36ffe7', marginRight: '5px' }}>•</span> Developed Pakira full-stack MVP0 in React & developed Pakira lumber forum for 200+ businesses.
          </Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}
