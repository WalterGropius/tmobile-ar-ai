import { Button } from '@mui/material';
import { FC } from 'react';
import { Color } from '../../core/theme/color';

export const SelectButton: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Button
    sx={{
      backgroundColor: Color.magenta,
      color: Color.white,
      borderRadius: '20px',
     
      width: 'auto', // Make the button as wide as its content
    }}
  >
    {children}
  </Button>
);
