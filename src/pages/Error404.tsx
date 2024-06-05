import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  page: string;
};

export const Error404: FC<Props> = ({ page }) => (
  <Box sx={{ m: 2 }}>
    <h1>Error 404</h1>
    <p>Route "{page || '/'}" does not exist.</p>
  </Box>
);
