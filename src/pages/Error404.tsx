import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { FC } from 'react';

export const Error404: FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ m: 2 }}>
      <h1>Error 404</h1>
      <p>Route "{location.pathname}" does not exist.</p>
    </Box>
  );
};
