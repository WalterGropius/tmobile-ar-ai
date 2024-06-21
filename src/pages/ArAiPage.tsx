import { ModelationCableAnimPage } from './Modelation/ModelationCableAnimPage';
import { ModelationPowerAnimPage } from './Modelation/ModelationPowerAnimPage';
import { ModelationAiFrontPage } from './Modelation/ModelationAiFrontPage';
import { ModelationArFrontPage } from './Modelation/ModelationArFrontPage';
import { ModelationArBackPage } from './Modelation/ModelationArBackPage';
import { ModelationAiBackCabPage } from './Modelation/ModelationAiBackCab';
import { ModelationAiBackPowPage } from './Modelation/ModelationAiBackPow';
import { useModelationRouter } from '../hooks/useModelationRouter';
import { ModelationArPowButtPage } from './Modelation/ModelationArPowButt';
import { FC, ReactNode } from 'react';
import { useAR } from '../hooks/useAR';
import { useAI } from '../hooks/useAI';
import { Step } from '@/types/modelation';
import { Box } from '@mui/material';

export const ArAiPage: FC = () => {
  const { connectionType, step } = useModelationRouter();
  const { containerRef, initialized } = useAR(connectionType, step);
  const { detections, videoRef, handleExecute, labeledDetections } = useAI(connectionType);

  const PAGE_BY_STEP: Record<Step, ReactNode> = {
    start:<> </>,
    powButt: <ModelationArPowButtPage />,
    arFront: <ModelationArFrontPage loaded={initialized} />,
    arBack: <ModelationArBackPage />,
    aiFront: <ModelationAiFrontPage labeledDetections={labeledDetections} handleExecute={handleExecute} />,
    aiBackCab: <ModelationAiBackCabPage />,
    aiBackPow:<ModelationAiBackPowPage/>,
    cableAnim: <ModelationCableAnimPage />,
    powerAnim: <ModelationPowerAnimPage />,
    finish:<> </>,
  };

  return (
    <Box>
      {PAGE_BY_STEP[step] || PAGE_BY_STEP.arFront}
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
    </Box>
  );
};