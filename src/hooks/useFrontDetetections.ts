import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';

const sortDetections = (detections: Detection[]): Detection[] =>
  detections.sort((a, b) => a.xPos - b.xPos);

const filterLights = (detections: Detection[]): boolean[] => {
  const lights = detections.filter(({ label }) => label && label.includes('light'));
  return lights.length === 6
    ? lights.map(light => light.label === 'lightg')
    : Array(6).fill(false);
};

const useFrontDetections = (labeledDetections: Detection[]): { lightStatus: boolean[], isFlipped: boolean } => {
  const [lightStatus, setLightStatus] = useState<boolean[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    const hasMultiplePorts = labeledDetections.filter(({ label }) => label === 'port').length > 3;
    const sortedDetections = sortDetections(labeledDetections);
    const lights = filterLights(sortedDetections);

    setIsFlipped(hasMultiplePorts);
    setLightStatus(lights);
  }, [labeledDetections]);

  return { lightStatus, isFlipped };
};

export default useFrontDetections;
