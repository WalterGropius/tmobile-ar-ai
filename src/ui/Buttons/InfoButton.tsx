import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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
    }}
  >
    <InfoIcon sx={{ color: Color.grey, p: 1, borderRadius: '50%', backgroundColor: Color.white }} />
  </IconButton>
);
