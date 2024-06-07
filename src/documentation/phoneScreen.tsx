import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

type PhoneScreenProps = {
  children: ReactNode;
};

export const PhoneScreen: FC<PhoneScreenProps> = ({ children }) => (
  <Box
    sx={{
      width: '375px', 
      height: '667px', 
      border: '16px solid black',
      borderRadius: '36px',
      padding: '16px',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        '-webkit-overflow-scrolling': 'touch',
      }}
    >
      {children}
    </Box>
  </Box>
);
