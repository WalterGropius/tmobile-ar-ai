import React, { useState, useEffect } from 'react';
import {Header} from './components/Header'; // Make sure to create these components
import {Footer} from './components/Footer';
import HomePage from './components/HomePage';
import SelectConnectionType from './components/SelectConnectionType';
import InfoPage from './components/InfoPage';

const parseHash = (hash) => {
  return hash.replace(/^#/, '') || 'home';
};

function App() {
  const [currentPage, setCurrentPage] = useState(parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'select-connection-type':
        return <SelectConnectionType />;
      case 'connection-info':
        return <InfoPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <Header currentPage={currentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
