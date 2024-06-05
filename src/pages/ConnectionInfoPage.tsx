import { useState, useEffect } from 'react';
import { Page } from '../types/page';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const ConnectionInfoPage = () => {
  const [connectionType, setConnectionType] = useState('');

  const navigate = (page: Page, type: string) => {
    window.location.hash = `#page=${page}&connection=${type}`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const connection = params.get('connection');
    if (connection) setConnectionType(connection);
  }, [window.location.hash]);

  return (
    <Box>
      <h1>Základní instrukce pro instalaci {connectionType.toUpperCase()} připojení</h1>
      <h2>Pro úspěšnou instalaci je potřeba následující:</h2>
      <p>- modem položený na prázdný tmavý stůl tak, abyste viděli v dolní části na konektory</p>
      <p>- kabel pro propojení {connectionType.toUpperCase()} zásuvky k modemu</p>
      <p>- zdrojov kabel pro připojení modemu do elektřiny</p>
      <Footer>
        <Link to={`/connection-type?connection=${connectionType || 'DSL'}`}>
          <Button>Zpět</Button>
        </Link>
        <Link to={`/ar-viewer?connection=${connectionType || 'DSL'}`}>
          <Button>Pokračovat</Button>
        </Link>
      </Footer>
    </Box>
  );
};
