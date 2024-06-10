import { useState } from 'react';
import { TECHNOLOGY_ITEMS } from '../types/connection';
import { Container, Box, Modal } from '@mui/material';
import { ConnectionBox } from '../ui/ConnectionBox';
import { SelectButton } from '../ui/Buttons/SelectButton';
import { InfoButton } from '../ui/Buttons/InfoButton';
import { Link } from 'react-router-dom';
import { Drawer } from '../ui/Drawer';

export const ConnectionTypePage = () => {
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleOpen = (imageSrc: string) => {
    setModalImage(imageSrc);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <h1>Vyberte svůj typ online připojení</h1>
      {Object.entries(TECHNOLOGY_ITEMS).map(([technology, { title, subTitle, imgSrc }], key) => (
        <ConnectionBox key={key} title={title} subtitle={subTitle} imageSrc="/ui/fromfigma/modem.png" imageAlt={title}>
          <Box sx={{ mr: 1 }}>
            <InfoButton onClick={() => handleOpen(imgSrc)} />
          </Box>
          <Link to={`/connection-info?connection=${technology}`}>
            <SelectButton>Vybrat</SelectButton>
          </Link>
        </ConnectionBox>
      ))}
      <Modal open={open} onClose={handleClose}>
        <Drawer>
          <img src={modalImage} alt="Technology Info" />
        </Drawer>
      </Modal>
      </>
  );
};
