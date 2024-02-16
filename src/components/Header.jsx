// Header.js
import React from 'react';
import useAppState from './AppState';

const Header = () => {
  const { currentPage } = useAppState();
  let title;
  switch (currentPage) {
    case 'select-connection-type':
      title = 'Select Connection Type';
      break;
    case 'info':
      title = 'Connection Info';
      break;
    default:
      title = 'Welcome';
  }

  return <header><h1>{title}</h1></header>;
};
