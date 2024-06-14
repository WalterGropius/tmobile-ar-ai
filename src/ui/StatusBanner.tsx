import { Color } from '../core/theme/color';
import { Box } from '@mui/material';
import { FC } from 'react';

type Status = 'aicontrol' | 'ardetect';

type StatusBannerProps = {
  status?: Status;
};

// TODO: Barva z Color konstanty
const STATUS_CONFIGURATION: Record<Status, { background: string; label: string; color: string }> = {
  aicontrol: { background: '#4ad9cd', label: '⚙ AI Kontrola', color: '#000000' },
  ardetect: { background: '#000000', label: '⚙ AR Detekce', color: '#ffffff' },
};

export const StatusBanner: FC<StatusBannerProps> = ({ status }) =>
  status ? (
    <Box
      sx={{
        background: STATUS_CONFIGURATION[status].background,
        color: STATUS_CONFIGURATION[status].color,
        p: 1,
        borderRadius: '4px',
        display: 'inline-block',
        width: 'auto',
      }}
    >
      {STATUS_CONFIGURATION[status].label}
    </Box>
  ) : null;
export type { Status };
