import { ConnectionType, TECHNOLOGY_ITEMS } from '../types/connection';
import { Container, Box, Modal } from '@mui/material';
import { ConnectionBox } from '../ui/ConnectionBox';
import { SelectButton } from '../ui/Buttons/SelectButton';
import { InfoButton } from '../ui/Buttons/InfoButton';
import { MainTitle } from '../ui/MainTitle';
import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Link } from 'react-router-dom';

export const ConnectionTypePage = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<ConnectionType | undefined>(undefined);

  return (
    <Container sx={{ py: 3 }}>
      <MainTitle>Vyberte svůj typ online připojení</MainTitle>
      {Object.entries(TECHNOLOGY_ITEMS).map(([technology, { title, subTitle }], key) => (
        <ConnectionBox key={key} title={title} subtitle={subTitle} imageSrc="/ui/fromfigma/modem.png" imageAlt={title}>
          <Box sx={{ mr: 1 }}>
            <InfoButton onClick={() => setSelectedTechnology(technology as ConnectionType)} />
          </Box>
          <Link to={`/connection-info?connection=${technology}`}>
            <SelectButton>Vybrat</SelectButton>
          </Link>
        </ConnectionBox>
      ))}
      {selectedTechnology && (
        <Modal open={true} onClose={() => setSelectedTechnology(undefined)}>
          <Drawer open={true}>
            <img src={TECHNOLOGY_ITEMS[selectedTechnology].imgSrc} alt={TECHNOLOGY_ITEMS[selectedTechnology].title} />
          </Drawer>
        </Modal>
      )}
    </Container>
  );
};
