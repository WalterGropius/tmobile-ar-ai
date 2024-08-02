import { ConnectionType } from '../types/connection';
import { Detection } from '../types/modelation';

type CabStatus = 'correct' | 'error' | 'wrong-cab' | 'no-cab' | 'flip' | null;

export const useBackCabDetect = (labeledDetections: Detection[], connectionType: ConnectionType): CabStatus => {
  const hasLabel = (label: string) => labeledDetections.some((detection) => detection.label === label);
  const countLabel = (label: string) => labeledDetections.filter((detection) => detection.label === label).length;

  const checkCabStatus = (
    correctCab: string,
    vacantPort: string,
    wrongCab: string,
    occupiedPort: string
  ): CabStatus => {
    const hasMultipleIndicators = countLabel('ind') > 2;
    const hasMultipleLights = countLabel('light') > 2;
    const hasMultiplePorts = countLabel('port') > 2;

    if (hasMultipleIndicators || hasMultipleLights) {
      return 'flip'; // multiple indicators or lights are visible u should flip it
    }
    if (hasLabel(correctCab) || (!hasLabel(occupiedPort) && hasMultiplePorts)) {
      return 'correct'; // the correct cab is visible or the port that should be occupied isnt
    }
    if (hasLabel(occupiedPort)) {
      return 'error'; // the port that should be occupied isnt
    }
    if (hasLabel(wrongCab) || (!hasLabel(vacantPort) && hasMultiplePorts)) {
      return 'wrong-cab'; // the wrong cab is visible or the port that should be vacant isnt
    }

    return 'no-cab'; // no cab is visible
  };

  if (connectionType === 'DSL') {
    return checkCabStatus('cabdsl', 'portwan', 'cabwan', 'portdsl');
  }
  if (connectionType === 'OPTIC' || connectionType === 'WAN') {
    return checkCabStatus('cabwan', 'portdsl', 'cabdsl', 'portwan');
  }

  return null;
};
