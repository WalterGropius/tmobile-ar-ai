import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Color } from '../core/theme/color';

type ConnectionBoxProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
};

export const ConnectionBox: FC<ConnectionBoxProps> = ({ title, subtitle, imageSrc, imageAlt, children }) => (
  <Box
    sx={{
      background: Color.lightGrey,
      backgroundImage: `url(${imageSrc})`,
      backgroundPosition: 'calc(100% + 20%) calc(100% )',
      backgroundRepeat: 'no-repeat',
      color: Color.black,
      borderRadius: '.8em',
      boxShadow: '0 4px 8px rgba(0, 0, 0, .1)',
      padding: 3,
      my: 3,
    }}
  >
    <Typography variant="h4">{title}</Typography>
    {subtitle && <Box sx={{ my: 2 }}>{subtitle}</Box>}
    <Box sx={{ display: 'flex', height: '8em' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex' }}>{children}</Box>
      </Box>
    </Box>
  </Box>
);
