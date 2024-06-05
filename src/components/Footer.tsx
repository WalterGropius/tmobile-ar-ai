import { FC } from 'react';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
type Props = {
  children: ReactNode;
};

export const Footer: FC<Props> = ({ children }) => (
  <Box
    component="footer"
    sx={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      bottom: 0,
      width: '100vw',
      zIndex: 1000000000,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
   
  </Box>
);
