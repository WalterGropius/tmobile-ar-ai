import React, { useState, useEffect } from 'react';

const ConnectionInfoPage = () => {
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const connection = params.get('connection');
    if (connection) setConnectionType(connection);
  }, [window.location.hash]);

  return (
    <div className="page">
      <p>Vybrali jste připojení {connectionType.toUpperCase()}.</p>
    </div>
  );
};

export default ConnectionInfoPage;
