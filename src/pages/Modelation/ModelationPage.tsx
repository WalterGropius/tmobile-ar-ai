import { FC, ReactNode } from 'react';
import { ModelationCableAnimPage } from './ModelationCableAnimPage';
import { ModelationPowerAnimPage } from './ModelationPowerAnimPage';
import { ModelationArFrontPage } from './ModelationArFrontPage';
import { ModelationAiFrontPage } from './ModelationAiFrontPage';
import { ModelationAiBackPage } from './ModelationAiBackPage';
import { ModelationArBackPage } from './ModelationArBackPage';
import { ModelationFinishPage } from './ModelationFinishPage';
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { ModelationStartPage } from './ModelationStartPage';
import { Step } from '../../types/modelation';

export const ModelationPage: FC = () => {
  const { step } = useModelationRouter();

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

  return PAGE_BY_STEP[step] || PAGE_BY_STEP.start;
};
