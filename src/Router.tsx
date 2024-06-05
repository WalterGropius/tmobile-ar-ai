import { ConnectionInfoPage } from './pages/ConnectionInfoPage';
import { ConnectionTypePage } from './pages/ConnectionTypePage';
import { FC, ReactNode } from 'react';
import { Yolo7modem } from './pages/Yolo7modem';
import { Error404 } from './pages/Error404';
import { ARViewer } from './pages/ARViewer';
import { HomePage } from './pages/HomePage';
import { Page } from './types/page';
import { Fin } from './pages/Fin';

type Props = {
  page: Page;
};

export const PAGE_BY_TYPE: Record<Page, { component: ReactNode; title?: string }> = {
  home: { component: <HomePage />, title: 'AR Manuál pro modem Zyxel' },
  connectionType: { component: <ConnectionTypePage />, title: 'Vyberte typ připojení' },
  connectionInfo: { component: <ConnectionInfoPage />, title: 'Info o připojení' },
  arViewer: { component: <ARViewer connectionType={'TODO'} /> }, // TODO
  yolo7modem: { component: <Yolo7modem /> },
  fin: { component: <Fin /> },
};

export const Router: FC<Props> = ({ page }) => PAGE_BY_TYPE[page]?.component || <Error404 page={page} />;
