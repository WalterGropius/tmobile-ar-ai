import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';

type CabPowStatus = 'correct' | 'error' | 'flip' | 'no-cabPow' | null;

const useBackPowDetect = (labeledDetections: Detection[]): CabPowStatus => {
  const [cabPowStatus, setCabPowStatus] = useState<CabPowStatus>(null);

  useEffect(() => {
    const hasLabel = (label: string) => labeledDetections.some(detection => detection.label === label);
    const countLabel = (label: string) => labeledDetections.filter(detection => detection.label === label).length;

    const hasCabPow = hasLabel('cabpow');
    const hasPortPow = hasLabel('portpow');
    const hasMultipleIndicators = countLabel('ind') > 1;
    const hasMultipleLights = countLabel('light') > 1;

    if (hasCabPow) {
      setCabPowStatus(hasPortPow ? 'error' : 'correct');
    } else if (hasMultipleIndicators || hasMultipleLights) {
      setCabPowStatus('flip');
    } else {
      setCabPowStatus('no-cabPow');
    }
  }, [labeledDetections]);

  return cabPowStatus;
};

export default useBackPowDetect;
