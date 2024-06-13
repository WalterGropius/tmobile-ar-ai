import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { useSearchParams } from 'react-router-dom';
import { ModelationPage } from './Modelation/ModelationPage';
import { FC, useMemo } from 'react';
import { useAR } from '../hooks/useAR';
import { useAI } from '../hooks/useAI';
import { Box } from '@mui/material';

export const ArAi: FC = () => {
  const [searchParams] = useSearchParams();

  const connection = searchParams.get('connection') || '';
  const connectionType = useMemo(() => resolveConnectionType(connection), [connection]);

  const { containerRef } = useAR(connectionType);
  const { videoRef } = useAI(connectionType);

  return (
    <Box>
      <ModelationPage />
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      <video ref={videoRef} autoPlay playsInline />
    </Box>
  );
};
