import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';
import { ConnectionType } from '../types/connection';

type CabStatus = 'correct' | 'error' | 'wrong-cab' | 'no-cab' | 'flip' | null;

const useBackCabDetect = (labeledDetections: Detection[], connectionType: ConnectionType): CabStatus => {
  const [cabStatus, setCabStatus] = useState<CabStatus>(null);

  useEffect(() => {
    const hasLabel = (label: string) => labeledDetections.some(detection => detection.label === label);
    const countLabel = (label: string) => labeledDetections.filter(detection => detection.label === label).length;

    const hasMultipleIndicators = countLabel('ind') > 2;
    const hasMultipleLights = countLabel('light') > 2;
    const hasMultiplePorts = countLabel('port') > 2;

    const checkCabStatus = (correctCab: string, vacantPort: string, wrongCab: string, occupiedPort: string) => {
      if (hasLabel(correctCab) ||( !hasLabel(occupiedPort) && hasMultiplePorts)) {
        setCabStatus('correct');
      } else if (hasLabel(occupiedPort)) {
        setCabStatus('error');//not inserted
      } else if (hasLabel(wrongCab) || (!hasLabel(vacantPort) && hasMultiplePorts)) {
        setCabStatus('wrong-cab');
      } else if (hasMultipleIndicators || hasMultipleLights) {
        setCabStatus('flip');
      } else {
        setCabStatus('no-cab');
      }
    };

    if (connectionType === 'DSL') {
      checkCabStatus('cabdsl', 'portwan', 'cabwan', 'portdsl');
    } else if (connectionType === 'OPTIC' || connectionType === 'WAN') {
      checkCabStatus('cabwan', 'portdsl', 'cabdsl', 'portwan');
    }
  }, [labeledDetections, connectionType]);

  return cabStatus;
};

export default useBackCabDetect;
