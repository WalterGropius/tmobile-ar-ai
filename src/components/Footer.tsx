import { ReactNode } from 'react';
import { Color } from '../core/theme/color';
import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  children?: ReactNode;
  background?: typeof Color;
};

export const Footer: FC<Props> = ({ children, background }) => (
  <Box
    component="footer"
    sx={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      background: background || Color.white,
      zIndex: 9999,
    }}
  >
    <Box sx={{ px: 2 }}>{children}</Box>
  </Box>
);
