import { Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC, useState } from 'react';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Drawer: FC<DrawerProps> = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          width: '100%',
          height: '50%',
          borderRadius: 5,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};
