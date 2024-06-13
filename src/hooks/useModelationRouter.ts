import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { useSearchParams } from 'react-router-dom';
import { Step } from '../types/modelation';

export const useModelationRouter = () => {
  const [searchParams] = useSearchParams();

  const connectionType = resolveConnectionType(searchParams.get('connection') || '');

  return {
    connectionType,
    step: (searchParams.get('step') || '') as Step,
    redirectToPage: (page: string) => {
      window.location.href = `/#/${page}`;
    },
    redirectToStep: (step: Step) => {
      window.location.href = `/#/ar-viewer?connection=${connectionType}&step=${step}`;
    },
  };
};
