import { Box } from '@mui/material';
import { FC } from 'react';

type StatusBannerProps = {
  status: 'aicontrol' | 'ardetect' | null;
};

export const StatusBanner: FC<StatusBannerProps> = ({ status }) => {
  if (status === null) return null;

  const backgroundColor = status === 'aicontrol' ? 'green' : 'black';
  const text = status === 'aicontrol' ? '⚙ AI Control' : '⚙ AR Detect';

  return (
    <Box
      sx={{
        backgroundColor,
        color: 'white',
        p: 1,
        borderRadius: '4px',
        display: 'inline-block',
        width: 'auto',
      }}
    >
      {text}
    </Box>
  );
};