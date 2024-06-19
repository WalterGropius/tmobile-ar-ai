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
    fontFamily: '"Tele Neo", sans-serif',
    h2: { fontWeight: 700, color: Color.black, fontSize: '16px' },
    h1: { fontWeight: 700, fontSize: '32px' },
    h4: { fontWeight: 700, fontSize: '12px' },
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
          
          color: Color.black,
          borderColor: Color.magenta,
          textTransform: 'none',
          borderRadius: '4px',
        },
        contained: {
          background: Color.magenta,
          color: Color.white,
          ':hover': { background: Color.magentaLight, color: Color.white },
          ':active': { background: Color.magenta, color: Color.white },
          ':disabled': { background: Color.magenta40, color: Color.white },
        },
        outlined: {
          color: Color.magenta,

          borderColor: Color.magenta,
          ':hover': { background: Color.white, color: Color.magenta, border: `1px solid ${Color.magenta}` },
          ':active': { background: Color.magenta10, color: Color.magenta, border: `1px solid ${Color.magenta}` },
          ':disabled': { background: 'transparent', color: Color.magenta10, border: `1px solid ${Color.magenta10}` },
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
