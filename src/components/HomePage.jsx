// HomePage.js
import React from 'react';

const HomePage = () => (
  <div>
    <p>Welcome to the Installation Guide</p>
    <button onClick={() => (window.location.hash = 'select-connection-type')}>Start</button>
  </div>
);
export default HomePage;