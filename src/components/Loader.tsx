import { FC, ReactNode } from 'react';
import '../style/loader.css';

type Props = {
  children: ReactNode;
};

export const Loader: FC<Props> = ({ children }) => (
  <div className="wrapper">
    <div className="spinner"></div>
    <p>{children}</p>
  </div>
);
