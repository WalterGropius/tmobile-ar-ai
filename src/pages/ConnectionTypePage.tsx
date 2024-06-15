import { ConnectionType, TECHNOLOGY_ITEMS } from '../types/connection';
import { Container, Box, Modal } from '@mui/material';
import { ConnectionBox } from '../ui/ConnectionBox';
import { SelectButton } from '../ui/Buttons/SelectButton';
import { InfoButton } from '../ui/Buttons/InfoButton';
import { MainTitle } from '../ui/MainTitle';
import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export const ConnectionTypePage = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<ConnectionType | undefined>(undefined);

  return (
    <Container sx={{ py: 3 }} >
      <Box sx={{ overflowY: 'auto', height: '100vh',touchAction:"pan-y" }}>
      <MainTitle>Vyberte svůj typ online připojení</MainTitle>
      {Object.entries(TECHNOLOGY_ITEMS).map(([technology, { title, subTitle }], key) => (
        <ConnectionBox key={key} title={title} subtitle={subTitle} imageSrc="/ui/fromfigma/modem.png" imageAlt={title}>
          <Box sx={{ mr: 1 }}>
            <InfoButton onClick={() => setSelectedTechnology(technology as ConnectionType)} />
          </Box>
          <Link to={`/ar-viewer?connection=${technology}&step=arFront`}>
            <SelectButton>Vybrat</SelectButton>
          </Link>
        </ConnectionBox>    
))}
</Box>
      {selectedTechnology && (
        <Modal open={true} onClose={() => setSelectedTechnology(undefined)}>
          <Drawer open={true}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
              <h1>{TECHNOLOGY_ITEMS[selectedTechnology].title}</h1>
              <button onClick={() => setSelectedTechnology(undefined)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
                <CloseIcon />
              </button>
            </Box>
            <Box sx={{  maxHeight:"70vh" }}>
              <img style={{ width: '100%' }} src={TECHNOLOGY_ITEMS[selectedTechnology].imgSrc} alt={TECHNOLOGY_ITEMS[selectedTechnology].title} />
            </Box>
          </Drawer>
        </Modal>
      )}
    </Container>
  );
};
