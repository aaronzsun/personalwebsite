import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: 'var(--font-open-sans), sans-serif',  // Use the custom font variable
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: 'var(--font-open-sans), sans-serif',  // Apply the custom font to Link components
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'var(--font-open-sans), sans-serif',  // Apply the custom font to Button components
          },
        },
      },
    },
  });

export default theme;