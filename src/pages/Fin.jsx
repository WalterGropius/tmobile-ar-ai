//page 6

import React, { useState, useEffect } from 'react';

const Fin = () => {
  const [connectionType, setConnectionType] = useState('');

  const navigate = (page, type) => {
    window.location.hash = `#page=${page}&connection=${type}`;
    // location.reload();
  };

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const connection = params.get('connection');
    if (connection) setConnectionType(connection);
  }, [window.location.hash]);

  return (
    <div className="page">
      <h1>Gratulujeme</h1>
      <h2>Modem byl úspěšně zapojen</h2>
      <p>pro připojení zapojte LAN kabel anebo stiskněte WIFI tlačítko</p>
      <p>pro zapnutí WIFI sítě a připojte se pomocí QR kodu na zadní straně modemu</p>
      <p>nebo přihlášením pomocí WEP údajů.</p>
      <div className="footer">
        <button onClick={() => navigate(5, connectionType || 'DSL')}>Zpět</button>
        {/*  <button onClick={() => navigate(4, connectionType || 'DSL')}>Pokračovat</button> */}
      </div>
    </div>
  );
};

export default Fin;
