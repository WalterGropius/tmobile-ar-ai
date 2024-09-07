import { useSearchParams } from 'react-router-dom';
import { Step } from '../types/modelation';

export const useModelationRouter = () => {
  const [searchParams] = useSearchParams();

  const redirect = (url: string, refreshAfterRedirect: boolean) => {
    window.location.href = url;
    if (refreshAfterRedirect) {
      window.location.reload();
    }
  };

  return {
    step: (searchParams.get('step') || '') as Step,
    redirectToPage: (page: string, refresh = false) => redirect(`/#/${page}`, refresh),
    redirectToStep: (step: Step, refresh = false) => redirect(`/#/ar-viewer?step=${step}`, refresh),
  };
};
