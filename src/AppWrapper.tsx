import { Box, createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Color } from './core/theme/color';

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: Color.black },
    secondary: { main: Color.black },
    background: { default: Color.magenta, paper: Color.white },
    text: { primary: Color.black, secondary: Color.black },
  },
  typography: {
    h1: { fontWeight: 700, fontSize: '1.5rem' },
    h4: { fontWeight: 700, fontSize: '1.2rem' },
    subtitle1: { fontSize: '1.2rem' },
    button: { textTransform: 'none' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: { backgroundColor: Color.magenta, color: Color.white },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          color: Color.magenta,
          borderColor: Color.magenta,
          textTransform: 'none',
          border: `1px solid transparent`,
          ':hover': { background: Color.white, color: Color.magenta, border: `1px solid ${Color.magenta}` },
        },
        contained: {
          background: Color.magenta,
          color: Color.white,
          ':hover': { background: Color.white, color: Color.white },
        },
      },
    },
  },
});

export const AppWrapper: FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Box>{children}</Box>
  </ThemeProvider>
);
