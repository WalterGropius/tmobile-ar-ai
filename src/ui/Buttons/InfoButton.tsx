import { IconButton } from '@mui/material';
import InfoIcon from '../InfoIcon';
import { FC } from 'react';
import { Color } from '../../core/theme/color';

type InfoButtonProps = {
  onClick?: () => void;
};

export const InfoButton: FC<InfoButtonProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      width: '40px',
      height: '40px',
      backgroundColor: Color.white,
    }}
  >
    <InfoIcon />
  </IconButton>
);
