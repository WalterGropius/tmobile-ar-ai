import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { FC } from 'react';
import { Color } from '../../core/theme/color';

export const InfoButton: FC = () => (
  <IconButton
    sx={{
    
      width: '40px',
      height: '40px',
    }}
  >
    <InfoIcon sx={{ color: Color.grey, p:1,borderRadius: '50%',backgroundColor: Color.white }} />
  </IconButton>
);
