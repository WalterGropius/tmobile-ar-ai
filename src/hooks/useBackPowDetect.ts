import { Detection } from '../types/modelation';

type CabPowStatus = 'correct' | 'error' | 'flip' | 'no-cabPow' | null;

export const useBackPowDetect = (labeledDetections: Detection[]): CabPowStatus => {
  const hasLabel = (label: string) => labeledDetections.some((detection) => detection.label === label);
  const countLabel = (label: string) => labeledDetections.filter((detection) => detection.label === label).length;

  const hasCabPow = hasLabel('powcab');
  const hasPortPow = hasLabel('pow');
  const hasMultipleLights = countLabel('light') > 1;

  if (hasCabPow) return hasPortPow ? 'error' : 'correct';
  if (hasMultipleLights) return 'flip';
  return 'no-cabPow';
};
