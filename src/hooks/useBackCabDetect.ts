import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';
import { ConnectionType } from '../types/connection';

type CabStatus = 'correct' | 'error' | 'wrong-cab' | 'no-cab' | 'flip' | null;

const useBackCabDetect = (labeledDetections: Detection[], connectionType: ConnectionType): CabStatus => {
  const [cabStatus, setCabStatus] = useState<CabStatus>(null);

  useEffect(() => {
    const hasLabel = (label: string) => labeledDetections.some((detection) => detection.label === label);
    const countLabel = (label: string) => labeledDetections.filter((detection) => detection.label === label).length;

    const checkCabStatus = (correctCab: string, vacantPort: string, wrongCab: string, occupiedPort: string) => {
      const hasMultipleIndicators = countLabel('ind') > 2;
      const hasMultipleLights = countLabel('light') > 2;
      const hasMultiplePorts = countLabel('port') > 2;

      if (hasMultipleIndicators || hasMultipleLights) {
        setCabStatus('flip'); // multiple indicators or lights are visible u should flip it
      } else if (hasLabel(correctCab) || (!hasLabel(occupiedPort) && hasMultiplePorts)) {
        setCabStatus('correct'); // the correct cab is visible or the port that should be occupied isnt
      } else if (hasLabel(occupiedPort)) {
        setCabStatus('error'); // the port that should be occupied isnt
      } else if (hasLabel(wrongCab) || (!hasLabel(vacantPort) && hasMultiplePorts)) {
        setCabStatus('wrong-cab'); // the wrong cab is visible or the port that should be vacant isnt
      } else {
        setCabStatus('no-cab'); // no cab is visible
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
