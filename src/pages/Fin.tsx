import { useState, useEffect } from 'react';
import { Page } from '../types/page';

export const Fin = () => {
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
    <div>
      <h1>Gratulujeme</h1>
      <h2>Modem byl úspěšně zapojen</h2>
      <p>pro připojení zapojte LAN kabel anebo stiskněte WIFI tlačítko</p>
      <p>pro zapnutí WIFI sítě a připojte se pomocí QR kodu na zadní straně modemu</p>
      <p>nebo přihlášením pomocí WEP údajů.</p>
      <div className="footer">
        <button onClick={() => navigate('yolo7modem', connectionType || 'DSL')}>Zpět</button>
      </div>
    </div>
  );
};
