import { Detection } from '../types/modelation';

type CabStatus = 'correct' | 'error' | 'flip' | 'no-cab' | null;

export const useRfCabDetect = (labeledDetections: Detection[]): CabStatus => {
  const hasLabel = (label: string) => labeledDetections.some((detection) => detection.label === label);
  const countLabel = (label: string) => labeledDetections.filter((detection) => detection.label === label).length;

  const hasCab = hasLabel('rfcab');
  const hasPort = hasLabel('rf');
  const hasMultipleLights = countLabel('light') > 1;

  if (hasCab) return hasPort ? 'error' : 'correct';
  if (hasMultipleLights) return 'flip';
  return 'no-cab';
};
