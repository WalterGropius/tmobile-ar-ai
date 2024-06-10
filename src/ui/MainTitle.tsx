import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainTitle: FC<Props> = ({ children }) => <h1>{children}</h1>;
