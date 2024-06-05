import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const HeaderTitle: FC<Props> = ({ children }) => <Box sx={{ px: 0.5, py: 1 }}>{children}</Box>;
