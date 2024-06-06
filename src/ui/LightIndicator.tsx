import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  statusList: boolean[];
};

export const LightIndicator: FC<Props> = ({ statusList }) => (
  <Box sx={{ display: 'flex' }}>
    {statusList.map((status, key) => (
      <Box key={key}>{status ? '🟢' : '⚫'}</Box>
    ))}
  </Box>
);
