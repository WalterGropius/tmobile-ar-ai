import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';
import { ConnectionType } from '../types/connection';

const useBackCabDetect = (labeledDetections: Detection[], ConnectionType: ConnectionType) => {
  const [cabStatus, setCabStatus] = useState<'correct' | 'error' | 'wrong-cab' | 'no-cab' | 'flip' | null>(null);

  useEffect(() => {
    const hasCabDSL = labeledDetections.some(({ label }) => label === 'cabdsl');
    const hasPortDSL = labeledDetections.some(({ label }) => label === 'portdsl');
    const hasCabWAN = labeledDetections.some(({ label }) => label === 'cabwan');
    const hasPortWAN = labeledDetections.some(({ label }) => label === 'portwan');
    const hasMultipleIndicators = labeledDetections.filter(({ label }) => label === 'ind').length > 1;
    const hasMultipleLights = labeledDetections.filter(({ label }) => label === 'light').length > 1;

    const checkCabStatus = () => {
      if (ConnectionType === 'DSL') {
        if (hasCabDSL) {
          console.log('hasCabDSL');
          if (!hasPortDSL) {
            console.log('correct-!hasPortDSL');
            setCabStatus('correct');
          } else {
            console.log('Error', labeledDetections);
            setCabStatus('error');
          }
        } else if (hasCabWAN) {
          console.log('Wrong cab', labeledDetections);
          setCabStatus('wrong-cab');
        } else if (hasMultipleIndicators || hasMultipleLights) {
          console.log('Flip', labeledDetections);
          setCabStatus('flip');
        } else {
          console.log('No cab', labeledDetections);
          setCabStatus('no-cab');
        }
      } else if (ConnectionType === 'OPTIC' || ConnectionType === 'WAN') {
        if (hasCabWAN) {
          console.log('hasCabWAN');
          if (!hasPortWAN) {
            console.log('correct-!hasPortWAN');
            setCabStatus('correct');
          } else {
            console.log('Error', labeledDetections);
            setCabStatus('error');
          }
        } else if (hasCabDSL) {
          console.log('Wrong cab', labeledDetections);
          setCabStatus('wrong-cab');
        } else if (hasMultipleIndicators || hasMultipleLights) {
          console.log('Flip', labeledDetections);
          setCabStatus('flip');
        } else {
          console.log('No cab', labeledDetections);
          setCabStatus('no-cab');
        }
      }
    };

    checkCabStatus();
  }, [labeledDetections, ConnectionType]);

  return cabStatus;
};
export default useBackCabDetect;
