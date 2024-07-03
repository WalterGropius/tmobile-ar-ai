import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';
import { ConnectionType } from '../types/connection';

type CabStatus = 'correct' | 'error' | 'wrong-cab' | 'no-cab' | 'flip' | null;

const useBackCabDetect = (labeledDetections: Detection[], connectionType: ConnectionType): CabStatus => {
  const [cabStatus, setCabStatus] = useState<CabStatus>(null);

  useEffect(() => {
    const hasLabel = (label: string) => labeledDetections.some(detection => detection.label === label);
    const countLabel = (label: string) => labeledDetections.filter(detection => detection.label === label).length;

    const hasMultipleIndicators = countLabel('ind') > 1;
    const hasMultipleLights = countLabel('light') > 1;

    const checkCabStatus = (correctCab: string, vacantPort: string,wrongCab:string,occupiedPort:string) => {
      if (hasLabel(correctCab)) {
        setCabStatus(hasLabel(vacantPort) ? 'correct' : 'error');
      } else if (hasLabel(wrongCab) || hasLabel(occupiedPort)) {
        setCabStatus('wrong-cab');
      } else if (hasLabel('light') || hasLabel('ind')) {
        setCabStatus('flip');
      } else {
        setCabStatus('no-cab');
      }
    };

    if (connectionType === 'DSL') {
      checkCabStatus('cabdsl', 'portwan','cabwan','portdsl');
    } else if (connectionType === 'OPTIC' || connectionType === 'WAN') {
      checkCabStatus('cabwan', 'portdsl','cabdsl','portwan');
    }
  }, [labeledDetections, connectionType]);

  return cabStatus;
};

export default useBackCabDetect;
