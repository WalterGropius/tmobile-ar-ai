import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

export const Fin = () => {
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const connection = params.get('connection');
    if (connection) setConnectionType(connection);
  }, [window.location.hash]);

  return (
    <Box>
      <h1>Gratulujeme</h1>
      <h2>Modem byl úspěšně zapojen</h2>
      <p>pro připojení zapojte LAN kabel anebo stiskněte WIFI tlačítko</p>
      <p>pro zapnutí WIFI sítě a připojte se pomocí QR kodu na zadní straně modemu</p>
      <p>nebo přihlášením pomocí WEP dajů.</p>
      <Footer>
        <Link to={`/yolo-7-modem?connection=${connectionType || 'DSL'}`}>
          <Button variant="contained">Zpět</Button>
        </Link>
      </Footer>
    </Box>
  );
};
