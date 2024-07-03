import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';

const useBackPowDetect = (labeledDetections: Detection[]) => {
  const [cabPowStatus, setCabPowStatus] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    const hasCabPow = labeledDetections.some(({ label }) => label === 'cabpow');
    const hasPortPow = labeledDetections.some(({ label }) => label === 'portpow');

    if (hasCabPow) {
      console.log('hasCabPow');
      if (!hasPortPow) {
        setCabPowStatus('correct');
        console.log('!hasPortPow');
      } else {
        console.log('Detections:', labeledDetections);
        setCabPowStatus('incorrect');
      }
    }
  }, [labeledDetections]);

  return cabPowStatus;
};

export default useBackPowDetect;
