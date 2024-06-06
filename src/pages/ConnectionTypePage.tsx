import { CONNECTION_DESCRIPTIONS, ConnectionType } from '../types/connection';
import { Link, useLocation } from 'react-router-dom';
import { HeaderTitle } from '../components/HeaderTitle';
import { Box, Button } from '@mui/material';
import { Footer } from '../components/Footer';

export const ConnectionTypePage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const connectionType = (queryParams.get('connection') || '') as ConnectionType;

  return (
    <Box>
      <HeaderTitle>
        <h1>Vyberte typ připojení</h1>
      </HeaderTitle>
      <Box className="buttons">
        {['DSL', 'OPTIC', 'WAN'].map((connection) => (
          <Link key={connection} to={`/connection-type?connection=${connection}`}>
            <Button variant="contained">
              <h2>{connection}</h2>
            </Button>
          </Link>
        ))}
      </Box>
      <p>{CONNECTION_DESCRIPTIONS[connectionType]}</p>
      {connectionType ? (
        <Footer>
          <Link to={`/home?connection=${connectionType}`}>
            <Button variant="outlined">Zpět</Button>
          </Link>
          <Link to={`/connection-info?connection=${connectionType}`}>
            <Button variant="contained">Pokračovat</Button>
          </Link>
        </Footer>
      ) : null}
    </Box>
  );
};
