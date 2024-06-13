import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { Color } from '../core/theme/color';

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
      <Box sx={{ color: Color.white, background: Color.magenta, p: 4, borderRadius: 4, my: 4, textAlign: 'center' }}>
        <h6>Zapojení bylo úspěšné ✓</h6>
        <h2>A je to!</h2>
        <h2>Váš modem Zyxel máte úspěšně zapojený.</h2>
        <Box sx={{ textAlign: 'center' }}>
          <Box component="img" src="/ui/fromfigma/modem.png" alt="modem" sx={{ width: '80%', my: 6 }} />
        </Box>
        <p>pro připojení zapojte LAN kabel anebo stiskněte WIFI tlačítko</p>
        <p>pro zapnutí WIFI sítě a připojte se pomocí QR kodu na zadní straně modemu</p>
        <p>nebo přihlášením pomocí WEP údajů.</p>
      </Box>

    
    </Box>
  );
};
