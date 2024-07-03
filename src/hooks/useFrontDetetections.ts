import { useEffect, useState, useMemo } from 'react';
import { Detection } from '../types/modelation';

const sortDetections = (detections: Detection[]): Detection[] =>
  [...detections].sort((a, b) => a.xPos - b.xPos);

const filterLights = (detections: Detection[]): boolean[] => {
  const lights = detections.filter(({ label }) => label?.includes('light'));
  return lights.map(light => light.label === 'lightg');
};

const countPorts = (detections: Detection[]): number =>
  detections.filter(({ label }) => label === 'port').length;

const useFrontDetections = (labeledDetections: Detection[]): { lightStatus: boolean[], isFlipped: boolean } => {
  const sortedDetections = useMemo(() => sortDetections(labeledDetections), [labeledDetections]);
  const lights = useMemo(() => filterLights(sortedDetections), [sortedDetections]);
  const portCount = useMemo(() => countPorts(labeledDetections), [labeledDetections]);

  const [lightStatus, setLightStatus] = useState<boolean[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    setLightStatus(lights);
    setIsFlipped(portCount > 2);
  }, [lights, portCount]);

  return { lightStatus, isFlipped };
};

export default useFrontDetections;
