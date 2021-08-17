import {extendTheme, ThemeConfig} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      'html, body': {
        fontFamily: "'Open Sans', sans-serif",
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      },

      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    }
  },
  fonts: {
    body: "'Open Sans', sans-serif",
    heading: "'Open Sans', sans-serif",
    mono: 'monospace'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
    extrabold: 800
  },
  colors: {
    primary: '#1267fc',
    dark: {
      50: '#EBF3F9',
      100: '#E3EDF5',
      200: '#C9DAEC',
      300: '#9BAFC8',
      400: '#687991',
      500: '#2D3748',
      600: '#202A3D',
      700: '#161F33',
      800: '#0E1529',
      900: '#080E22'
    }
  },
  space: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});

export type AppTheme = typeof theme;

export default theme;
