import { useEffect, useState } from 'react';
import { PAGE_BY_TYPE } from '../Router';
import { Page } from '../types/page';
import '../style/App.css';

export const Header = () => {
  const [pageTitle, setPageTitle] = useState('Introduction');

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const page = (params.get('page') || '') as Page;

    setPageTitle(PAGE_BY_TYPE[page].title || 'AR Manuál');
  }, [window.location.hash]);

  return (
    <header>
      <h1>{pageTitle}</h1>
    </header>
  );
};
