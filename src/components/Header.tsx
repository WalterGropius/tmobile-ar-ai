import { useEffect, useState } from 'react';
import { Page } from '../types/page';
import '../style/App.css';

const PAGE_BY_TYPE: Partial<Record<Page, string>> = {
  home: 'AR Manuál pro modem Technicolor',
  connectionType: 'Vyberte typ připojení',
  connectionInfo: 'Info o připojení',
};

export const Header = () => {
  const [pageTitle, setPageTitle] = useState('Introduction');

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const page = (params.get('page') || '') as Page;

    setPageTitle(PAGE_BY_TYPE[page] || 'AR Manuál');
  }, [window.location.hash]);

  return (
    <header>
      <h1>{pageTitle}</h1>
    </header>
  );
};
