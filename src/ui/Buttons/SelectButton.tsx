import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { Color } from '../../core/theme/color';

type Props = {
  children: ReactNode;
};

export const SelectButton: FC<Props> = ({ children }) => (
  <Button sx={{ backgroundColor: Color.magenta, color: Color.white, borderRadius: '1.5em', px: 2, width: 'auto' }}>
    {children}
  </Button>
);
