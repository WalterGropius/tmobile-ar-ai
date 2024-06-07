import { Box } from '@mui/material';
import { FC } from 'react';

type ImgboxProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

export const ImgBox: FC<ImgboxProps> = ({ src, alt, width = '100%', height = 'auto' }) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      style={{
        width,
        height,
        borderRadius: '8px',
        textAlign: 'left',
      }}
    />
  );
};
