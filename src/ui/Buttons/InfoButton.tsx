import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { FC } from 'react';

export const InfoButton: FC = () => (
  <IconButton
    sx={{
      backgroundColor: '#f0f0f0',
      width: '40px',
      height: '40px',
    }}
  >
    <InfoIcon style={{ color: '#555' }} />
  </IconButton>
);
