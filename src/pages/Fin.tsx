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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: Color.white,
          background: Color.magenta,
          justifyContent: 'space-around',
          textAlign: 'center',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <h6 style={{ fontSize: '16px' }}>Zapojení bylo úspěšné ✓</h6>
        <Box>
          {' '}
          <h2 style={{ fontSize: '42px', padding: 0, margin: 0 }}>A je to!</h2>
          <h2 style={{ fontSize: '42px', padding: 0, margin: 0 }}>Váš modem Zyxel</h2>
          <h2 style={{ fontSize: '42px', padding: 0, margin: 0 }}>máte úspěšně</h2>
          <h2 style={{ fontSize: '42px', padding: 0, margin: 0 }}>zapojený.</h2>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Box component="img" src="/tv.png" alt="modem" sx={{ width: '80%', my: 6 }} />
        </Box>
      </Box>
    </Box>
  );
};
