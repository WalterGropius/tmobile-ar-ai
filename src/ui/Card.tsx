import { FC, ReactNode } from 'react';
import { Color } from '../core/theme/color';
import { Box } from '@mui/material';

type Props = {
  title?: ReactNode;
  children?: ReactNode;
};

export const Card: FC<Props> = ({ title, children }) => (
  <Box sx={{ border: `1px solid #555`, borderRadius: '.25em', mb: 1 }}>
    {title && <Box sx={{ background: Color.magenta, color: Color.white, p: 1 }}>{title}</Box>}
    <Box sx={{ p: 2 }}>{children}</Box>
  </Box>
);
