import { Box, Container } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Color } from '../core/theme/color';

type DrawerProps = {
  open?: boolean;
  children?: ReactNode;
};

export const Drawer: FC<DrawerProps> = ({ open, children }) => (
  <Box
    sx={{
      display: open ? 'block' : 'none',
      position: 'fixed',
      left: 0,
      color: Color.black,
      bottom: 0,
      width: '100%',
      background: Color.white,
      borderTopLeftRadius: '.8em',
      borderTopRightRadius: '.8em',
      zIndex: 9999,
    }}
  >
    <Container sx={{ p: 2 }}>{children}</Container>
  </Box>
);
