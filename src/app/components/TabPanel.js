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
    >
      {value === index && (
        <Box sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 1 }}> {/* Added margin-top */}
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
        bgcolor: '#161616',
        padding: 0,  // Add padding for the overall container
        mt: 3,
      }}
    >
      {/* Vertical AppBar only for this component */}
      <AppBar
        position="relative"
        className="resumeAppBar"
        elevation={0}
        sx={{
          bgcolor: '#161616',
          flexDirection: 'column',
          width: '150px',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          textColor="inherit"
          className="resumeTabs"
          variant="scrollable"
          aria-label="vertical tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#36ffe7', // Set color for tab indicator
              left: 0,
            },
          }}
          sx={{
            '.MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              alignItems: 'flex-start',
              minWidth: '120px',
              padding: 2,  // Padding for the tabs
              color: '#36ffe7',  // Set tab label color to #36ffe7
            },
          }}
        >
          <Tab label="OPTIVER" {...a11yProps(0)} />
          <Tab label="HUBSPOT" {...a11yProps(1)} />
          <Tab label="NIH" {...a11yProps(2)} />
          <Tab label="NASA" {...a11yProps(3)} />
          <Tab label="PAKIRA" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      {/* Main content area */}
      <Box className="resumeContent" sx={{ flexGrow: 1 }}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography className="resumePanel" variant="subtitle1" component="h6" color="#dbdbdb">
            Quantitative Trader Intern @{' '}
            <a 
              href="https://optiver.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              Optiver
            </a>
            <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: 3 }}>
              Jul 2023 - Aug 2023
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Operated independent quantitative sim desk, generating ~$50k over 4 weeks of trading Tesla options
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Developed new quantitative trading strategies by analyzing historic market flow/liquidity data and S&P 500 index correlations with Tesla volatility, Sharpe ratio of 2.8 when backtested
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Gained in-depth understanding of the Black-Scholes Model (options pricing), game theory, and stochastic calculus through Optiver&apos;s trader education program
            </Typography>
          </Typography>
        </TabPanel>

        <TabPanel className="resumePanel" value={value} index={1} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb">
            Software Engineer Intern @{' '}
            <a 
              href="https://www.hubspot.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              HubSpot
            </a>
            <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: 3 }}>
              Jul 2022 - Aug 2022
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Led creation of Storybook-UI Packages Application, an interface that aggregates all storybook enabled packages at HubSpot and their relevant information, accessed by hundreds of engineers for internal development.
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Developed Component Health UI alongside component tooling team, automatically providing developers with graded assessments of the compatibility of their Storybook-UI applications.
            </Typography>
          </Typography>
        </TabPanel>
        <TabPanel className="resumePanel" value={value} index={2} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb">
            Research Fellow @{' '}
            <a 
              href="https://lhncbc.nlm.nih.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              NIH Lister Hill Center
            </a>
            <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: 3 }}>
              Feb 2021 - Aug 2021
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - With Dr. Clement McDonald, Scientific Director of the Lister Hill National Center and NIH Data Discovery Group
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Created EasyPATH, a syntax parsing library to convert human-written expressions into FHIRPath, increasing accessibility of healthcare informatics resources across 100+ platforms & medical institutions across the US
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Wrote machine learning scripts (TensorFlow) for large COVID-19 patient datasets to determine efficacy of treatments.
            </Typography>
          </Typography>
        </TabPanel>
        <TabPanel className="resumePanel" value={value} index={3} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb">
            Research Intern @{' '}
            <a 
              href="https://www.jpl.nasa.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              NASA Jet Propulsion Laboratory
            </a>
            <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: 3 }}>
              June 2020 - August 2020
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - With Dr. Goldsmith, Group Director of the NASA JPL Structure of the Universe Division
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Developed python scripts to resolve foreground absorption issues in NASA spectroscopy data using procedural model generation & gaussian fitting
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Utilized scripts to model and predict the chemical indicators of massive star formation, presented at NASA Symposium.
            </Typography>
          </Typography>
        </TabPanel>
        <TabPanel className="resumePanel" value={value} index={4} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb">
            Founding Software Engineer @{' '}
            <a 
              href="https://www.pakira.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#36ffe7', textDecoration: 'none' }}
            >
              Pakira
            </a>
            <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: 3 }}>
              Jan 2020 - Jan 2021
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Co-Founding Software Engineer of Pakira, an online commodity trading platform to automate B2B transactions
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1, fontSize: '0.8rem', color: '#afafaf' }}>
              - Developed Pakira full-stack MVP0 in React & developed Pakira lumber forum for 200+ businesses.
            </Typography>
          </Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}
