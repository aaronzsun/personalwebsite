import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: 'var(--font-inter-tight), sans-serif',  // Use the custom font variable
      secondaryFont: 'var(--font-iosevka), monospace',
      tertiaryFont: 'var(--font-iosevka-med), monospace',
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