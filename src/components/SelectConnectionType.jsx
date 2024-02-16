// SelectConnectionType.js
import React from 'react';
import useAppState from './AppState';

const SelectConnectionType = () => {
  const { setConnectionType } = useAppState();

  return (
    <div>
      <button onClick={() => setConnectionType('DSL')}>DSL</button>
      <button onClick={() => setConnectionType('Optic')}>Optic</button>
      <button onClick={() => setConnectionType('WAN')}>WAN</button>
      <button onClick={() => (window.location.hash = 'info')}>Next</button>
    </div>
  );
};
