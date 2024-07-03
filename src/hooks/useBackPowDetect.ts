import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';

const useBackPowDetect = (labeledDetections: Detection[]) => {
  const [cabPowStatus, setCabPowStatus] = useState<'correct' | 'error' | 'flip' | 'no-cabPow' | null>(null);

  useEffect(() => {
    const hasCabPow = labeledDetections.some(({ label }) => label === 'cabpow');
    const hasPortPow = labeledDetections.some(({ label }) => label === 'portpow');
    const hasMultipleIndicators = labeledDetections.filter(({ label }) => label === 'ind').length > 1;
    const hasMultipleLights = labeledDetections.filter(({ label }) => label === 'light').length > 1;
   
    if (hasCabPow) {
      console.log('hasCabPow');
      if (!hasPortPow) {
        setCabPowStatus('correct');
        console.log('!hasPortPow');
      } else {
        console.log('Error:', labeledDetections);
        setCabPowStatus('error');
      }
    } else if (hasMultipleIndicators || hasMultipleLights) {
      console.log('Flip', labeledDetections);
      setCabPowStatus('flip');
    } else {
      console.log('No cabPow', labeledDetections);
      setCabPowStatus('no-cabPow');
    }
  }, [labeledDetections]);

  return cabPowStatus;
};

export default useBackPowDetect;
