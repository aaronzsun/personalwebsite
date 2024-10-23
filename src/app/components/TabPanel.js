import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
        <Box sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 0.5, backgroundColor: 'transparent' }}>  {/* Set background to transparent */}
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
        margin: 0,
      }}
    >
      <AppBar
        position="relative"
        className="resumeAppBar"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          flexDirection: 'column',
          width: { xs: "70px", sm: "70px", md: "120px" },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 'auto', // Adjust the height to fit the content of the Tabs
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '2px',  // Width of the gray background
              bgcolor: '#afafaf',  // Gray color for the entire indicator background
              opacity: 0.2,
            }}
          />
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            textColor="inherit"
            className="resumeTabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: '#36ffe7', // Entire bar is gray by default
                left: 0,
                width: '2px', // Width of the indicator
              },
            }}
            sx={{
              '.MuiTab-root': {
                textTransform: 'none',
                fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.8rem' },
                alignItems: 'flex-start',
                padding: { xs: 0, sm: 0, md: 0 },
                paddingLeft: { xs: 1.2, sm: 1.2, md: 2 },
                minHeight: { xs: '30px', sm: '35px', md: '40px' },
                height: { xs: '30px', sm: '35px', md: '40px' },
              },
              '.Mui-selected': {
                color: '#36ffe7',  // Selected tab text color
                backgroundColor: 'rgba(255, 255, 255, .1)'
              },
            }}
          >
            <Tab label="Optiver" {...a11yProps(0)} disableRipple/>
            <Tab label="HubSpot" {...a11yProps(1)} disableRipple/>
            <Tab label="NIH" {...a11yProps(2)} disableRipple/>
            <Tab label="NASA JPL" {...a11yProps(3)} disableRipple/>
            <Tab label="Pakira" {...a11yProps(4)} disableRipple/>
          </Tabs>
        </Box>
      </AppBar>


      <Box className="resumeContent" sx={{ flexGrow: 1, backgroundColor: 'transparent', minHeight: "300px" }}>  {/* Transparent background for content */}
        <TabPanel className="fade-in-tabs" value={value} index={0} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontWeight: "bold", fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1.05rem' }, mb: { xs: "2px", sm: "2px", md: "0px" } }}>
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
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", sm: "15px", md: "16px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.7rem' } }}>
            Jul - Aug 2023
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Led simulated trading desk for TSLA options, generating ~50K in profit. Had my hands on all the good stuff: Neptune, Bloomberg, and good-ol Python.
            Also learned a ton about stocastic calculus and the financial markets. 
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Developed a new event trading strategy utilizing S&P500 and NASDAQ correlations to TSLA volatility- Sharpe of 2.8 when backtested over past 5 years of FOMC meetings.
          </Typography>
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={1} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontWeight: "bold", fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1.05rem' }, mb: { xs: "2px", sm: "2px", md: "0px" } }}>
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
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", m: "15px", md: "16px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.7rem' } }}>
            Jul - Aug 2022
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Ideated and developed the JavaScript Package Center, an intuitive interface that aggregates components across all of HubSpot by their JavaScript libraries, accessed by 250+ engineers to assess and modify the landscape of their JS apps.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Created a comprehensive Component Health UI that automatically assesses the health of each component within its JavaScript ecosystem, factoring in current version support and compatability with its JS ecosystem. 
          </Typography>
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={2} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontWeight: "bold", fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1.05rem' }, mb: { xs: "2px", sm: "2px", md: "0px" } }}>
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
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", m: "15px", md: "16px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.7rem' } }}>
            Feb - Aug 2021
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Ideated and developed EasyPATH, a Python natural language processing library for the medicare language FHIRPath. Converts human-written expressions to FHIRPath, increasing the accessibility of healthcare informatics resources across 100+ platforms for medical institutions all around the US.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Joined the Data Discovery Group during the peak of COVID, where we utilized reinforcement learning (deep Q) to analyze huge patient datasets to identify the most efficacious treatments.
          </Typography>
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={3} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontWeight: "bold", fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1.05rem' }, mb: { xs: "2px", sm: "2px", md: "0px" } }}>
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
          <Typography variant="body2" component="p" sx={{ color: '#afafaf', mb: { xs: "15px", m: "15px", md: "16px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.7rem' } }}>
            June - August 2020
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Created spect-fitter, a collection of Python scripts to resolve foreground absorption issues with NASA&apos;s spectrometers aboard some of their biggest telescopes.
            Used a combo of procedural model generation & gaussian fitting to remove the noise from the spectrographs of massive star clusters.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Utilized these new spectrographs to model and predict the chemical indicators of massive stars about to form. Got to present my work at the Jet Propulsion Laboratory Symposium.
          </Typography>
        </TabPanel>

        <TabPanel className="fade-in-tabs" value={value} index={4} dir={theme.direction}>
          <Typography variant="subtitle1" component="h6" color="#dbdbdb" sx={{ fontWeight: "bold", fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1.05rem' }, mb: { xs: "2px", sm: "2px", md: "0px" } }}>
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
          <Typography variant="body2" component="p" sx={{ color: '#afafaf',mb: { xs: "15px", m: "15px", md: "16px" }, fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.7rem' } }}>
            Jan 2020 - Jan 2021
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Co-founded Pakira in collaboration with MIT and the Harvard Innovation Labs. We created the online platform to automate and centralize B2B transactions in the $20 trillion commodity industry.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: 1,
              fontSize: { xs: '0.8rem', sm: '0.8rem', md: '0.9rem' },
              color: '#afafaf',
              textAlign: 'left',  // Justify the content
              textIndent: '0',       // No negative indentation
              paddingLeft: '25px',   // Add enough padding to accommodate the bullet point
              position: 'relative',  // Position relative for the bullet point
              lineHeight: '1.5',
            }}
          >
            <ArrowRightIcon
              sx={{
                color: '#36ffe7',
                position: 'absolute',
                left: '0',
                display: 'inline-block',
              }}
            />
            Created the prototype and MVP0 for Pakira. Got to work with the full stack- utilizing a React frontend and Node backend to develop the initial forum and transaction market for 200+ businesses.
          </Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}
