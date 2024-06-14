import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  color: string;
  size?: `${number}` | number;
};

export const Circle: FC<Props> = ({ color, size }) => (
  <Box
    sx={{
      flexShrink: 0,
      m:0.5,
      display: 'inline-block',
      width: `${size || 10}px`,
      height: `${size || 10}px`,
      borderRadius: '100%',
      backgroundColor: color,
    }}
  />
);
