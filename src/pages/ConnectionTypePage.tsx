import { TECHNOLOGY_ITEMS } from '../types/connection';
import { ConnectionBox } from '../ui/ConnectionBox';
import { SelectButton } from '../ui/Buttons/SelectButton';
import { InfoButton } from '../ui/Buttons/InfoButton';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const ConnectionTypePage = () => (
  <Container sx={{ py: 3 }}>
    <h1>Vyberte svůj typ online připojení</h1>
    {Object.entries(TECHNOLOGY_ITEMS).map(([technology, { title, subTitle }], key) => (
      <ConnectionBox key={key} title={title} subtitle={subTitle} imageSrc="/ui/fromfigma/modem.png" imageAlt={title}>
        <InfoButton />
        <Link to={`/connection-info?connection=${technology}`}>
          <SelectButton>Vybrat</SelectButton>
        </Link>
      </ConnectionBox>
    ))}
  </Container>
);
