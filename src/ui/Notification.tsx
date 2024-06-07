import { Box, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { FC } from 'react';

type NotificationProps = {
  title: string;
  message: string;
};

export const Notification: FC<NotificationProps> = ({ title, message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff3e0', // Light orange background
        borderRadius: '8px',
        padding: '8px 16px',
        
      }}
    >
      <WarningAmberIcon sx={{ color: '#ffa726', marginRight: '8px' }} />
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Box>
    </Box>
  );
};
