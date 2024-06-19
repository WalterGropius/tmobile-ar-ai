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
      width: '42px',
      height: '42px',
      display: 'inline-block',
      borderRadius: '100%',
      backgroundColor: color,
    }}
  />
);
