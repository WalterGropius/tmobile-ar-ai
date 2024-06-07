import { Color } from '../core/theme/color';
import { Box } from '@mui/material';
import { FC } from 'react';

type Status = 'aicontrol' | 'ardetect';

type StatusBannerProps = {
  status?: Status;
};

// TODO: Barva z Color konstanty
const STATUS_CONFIGURATION: Record<Status, { background: string; label: string }> = {
  aicontrol: { background: 'green', label: '⚙ AI Control' },
  ardetect: { background: 'black', label: '⚙ AR Detect' },
};

export const StatusBanner: FC<StatusBannerProps> = ({ status }) =>
  status ? (
    <Box
      sx={{
        background: STATUS_CONFIGURATION[status].background,
        color: Color.white,
        p: 1,
        borderRadius: '4px',
        display: 'inline-block',
        width: 'auto',
      }}
    >
      {STATUS_CONFIGURATION[status].label}
    </Box>
  ) : null;
