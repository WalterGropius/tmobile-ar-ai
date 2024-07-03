import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Color } from '../core/theme/color';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
//kam s tim typem nema to byt v jinem souboru?
type NotificationProps = {
  title?: ReactNode;
  message?: ReactNode;
};

export const Notification: FC<NotificationProps> = ({ title, message }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: Color.orangeLight,
      borderRadius: '8px',
      padding: '8px 16px',
    }}
  >
    <Box sx={{ mr: 1 }}>
      <WarningAmberIcon sx={{ color: Color.orange, marginRight: '8px' }} />
    </Box>
    <Box>
      {title && (
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      {message && <Box sx={{ my: 1 }}>{message}</Box>}
    </Box>
  </Box>
);
