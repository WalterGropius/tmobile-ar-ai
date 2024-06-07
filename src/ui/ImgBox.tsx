import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

export const ImgBox: FC<Props> = ({ src, alt, width, height }) => (
  <Box
    component="img"
    src={src}
    alt={alt}
    sx={{ width: width || '100%', height: height || 'auto', borderRadius: '8px', textAlign: 'left' }}
  />
);
