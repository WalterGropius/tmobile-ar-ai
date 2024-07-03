import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';
import { ConnectionType } from '../types/connection';

type CabStatus = 'correct' | 'error' | 'wrong-cab' | 'no-cab' | 'flip' | null;

const useBackCabDetect = (labeledDetections: Detection[], connectionType: ConnectionType): CabStatus => {
  const [cabStatus, setCabStatus] = useState<CabStatus>(null);

  useEffect(() => {
    const hasLabel = (label: string) => labeledDetections.some(detection => detection.label === label);
    const countLabel = (label: string) => labeledDetections.filter(detection => detection.label === label).length;

    const hasCabDSL = hasLabel('cabdsl');
    const hasPortDSL = hasLabel('portdsl');
    const hasCabWAN = hasLabel('cabwan');
    const hasPortWAN = hasLabel('portwan');
    const hasMultipleIndicators = countLabel('ind') > 1;
    const hasMultipleLights = countLabel('light') > 1;

    const checkCabStatus = (expectedCab: string, expectedPort: string) => {
      if (hasLabel(expectedCab)) {
        setCabStatus(hasLabel(expectedPort) ? 'error' : 'correct');
      } else if (hasLabel(expectedCab === 'cabdsl' ? 'cabwan' : 'cabdsl')) {
        setCabStatus('wrong-cab');
      } else if (hasMultipleIndicators || hasMultipleLights) {
        setCabStatus('flip');
      } else {
        setCabStatus('no-cab');
      }
    };

    if (connectionType === 'DSL') {
      checkCabStatus('cabdsl', 'portdsl');
    } else if (connectionType === 'OPTIC' || connectionType === 'WAN') {
      checkCabStatus('cabwan', 'portwan');
    }
  }, [labeledDetections, connectionType]);

  return cabStatus;
};

export default useBackCabDetect;
