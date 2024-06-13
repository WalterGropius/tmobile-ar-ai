import { ModelationCableAnimPage } from './Modelation/ModelationCableAnimPage';
import { ModelationPowerAnimPage } from './Modelation/ModelationPowerAnimPage';
import { ModelationAiFrontPage } from './Modelation/ModelationAiFrontPage';
import { ModelationArFrontPage } from './Modelation/ModelationArFrontPage';
import { ModelationArBackPage } from './Modelation/ModelationArBackPage';
import { ModelationAiBackPage } from './Modelation/ModelationAiBackPage';
import { ModelationFinishPage } from './Modelation/ModelationFinishPage';
import { ModelationStartPage } from './Modelation/ModelationStartPage';
import { useModelationRouter } from '../hooks/useModelationRouter';
import { FC, ReactNode } from 'react';
import { useAR } from '../hooks/useAR';
import { useAI } from '../hooks/useAI';
import { Step } from '@/types/modelation';
import { Box } from '@mui/material';

export const ArAiPage: FC = () => {
  const { connectionType, step } = useModelationRouter();

  const { containerRef } = useAR(connectionType);
  const { videoRef } = useAI(connectionType);

  const PAGE_BY_STEP: Record<Step, ReactNode> = {
    start: <ModelationStartPage />,
    arFront: <ModelationArFrontPage />,
    arBack: <ModelationArBackPage />,
    aiFront: <ModelationAiFrontPage />,
    aiBack: <ModelationAiBackPage />,
    cableAnim: <ModelationCableAnimPage />,
    powerAnim: <ModelationPowerAnimPage />,
    finish: <ModelationFinishPage />,
  };

  return (
    <Box>
      {PAGE_BY_STEP[step] || PAGE_BY_STEP.start}
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      <video ref={videoRef} autoPlay playsInline />
    </Box>
  );
};
