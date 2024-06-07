import { ImgBox } from './ImgBox';
import { InfoButton } from './Buttons/InfoButton';
import { SelectButton } from './Buttons/SelectButton';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';

type ConnectionBoxProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
};

export const ConnectionBox: FC<ConnectionBoxProps> = ({ title, subtitle, imageSrc, imageAlt }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '8px', color: 'black' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: '16px', textAlign: 'center', color: 'black' }}>
        {subtitle}
      </Typography>
      <ImgBox src={imageSrc} alt={imageAlt} width="100px" height="100px" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
        <InfoButton />
        <SelectButton>Vybrat</SelectButton>
      </Box>
    </Box>
  );
};