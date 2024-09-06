import { Detection } from '../types/modelation';

type CabStatus = 'correct' | 'error' | 'flip' | 'no-cab' | null;

export const useRfCabDetect = (labeledDetections: Detection[]): CabStatus => {
  const hasLabel = (label: string) => labeledDetections.some((detection) => detection.label === label);
  const countLabel = (label: string) => labeledDetections.filter((detection) => detection.label === label).length;

  const hasCabPow = hasLabel('cabpow');
  const hasPortPow = hasLabel('portpow');
  const hasMultipleIndicators = countLabel('ind') > 1;
  const hasMultipleLights = countLabel('light') > 1;

  if (hasCabPow) return hasPortPow ? 'error' : 'correct';
  if (hasMultipleIndicators || hasMultipleLights) return 'flip';
  return 'no-cab';
};
