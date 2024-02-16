import React, { useEffect, useState } from 'react';
import "../style/App.css";
const Header = () => {
  const [pageTitle, setPageTitle] = useState('Introduction');

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const page = params.get('page');

    switch (page) {
      case '1':
        setPageTitle('AR Manuál pro modem Zyxel');
        break;
      case '2':
        setPageTitle('Vyberte typ připojení');
        break;
      case '3':
        setPageTitle('Info o připojení');
        break;
      default:
        setPageTitle('AR Manuál');
    }
  }, [window.location.hash]);

  return (
    <header>
      <h1>{pageTitle}</h1>
    </header>
  );
};

export default Header;
