// InfoPage.js
import React from 'react';
import useAppState from './AppState';

const InfoPage = () => {
  const { connectionType } = useAppState();

  return (
    <div>
      <p>Information for {connectionType} connection</p>
      <button onClick={() => {/* Navigate to next relevant page */}}>Next</button>
    </div>
  );
};
