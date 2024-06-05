import { CONNECTION_DESCRIPTIONS, ConnectionType } from '../types/connection';
import { Link, useLocation } from 'react-router-dom';
import { HeaderTitle } from '../components/HeaderTitle';
import { Box, Button } from '@mui/material';

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
        <Link to="/connection-type?connection=DSL">
          <Button variant="contained">
            <h2>DSL</h2>
          </Button>
        </Link>
        <Link to="/connection-type?connection=OPTIC">
          <Button variant="contained">
            <h2>OPTIC</h2>
          </Button>
        </Link>
        <Link to="/connection-type?connection=WAN">
          <Button variant="contained">
            <h2>WAN</h2>
          </Button>
        </Link>
      </Box>
      <p>{CONNECTION_DESCRIPTIONS[connectionType]}</p>
      {connectionType ? (
        <Box className="footer">
          <Link to={`/home?connection=${connectionType}`}>
            <Button variant="outlined">Zpět</Button>
          </Link>
          <Link to={`/connection-info?connection=${connectionType}`}>
            <Button variant="contained">Pokračovat</Button>
          </Link>
        </Box>
      ) : null}
    </Box>
  );
};
