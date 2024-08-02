import { Detection } from '../types/modelation';
import { useMemo } from 'react';

const sortDetections = (detections: Detection[]): Detection[] => detections.sort((a, b) => a.xPos - b.xPos);

const filterLights = (detections: Detection[]): boolean[] =>
  detections.filter(({ label }) => label?.includes('light')).map(({ label }) => label === 'lightg');

const countPorts = (detections: Detection[]): number => detections.filter(({ label }) => label === 'port').length;

export const useFrontDetections = (labeledDetections: Detection[]): { lightStatus: boolean[]; isFlipped: boolean } => {
  const sortedDetections = useMemo(() => sortDetections(labeledDetections), [labeledDetections]);
  const lights = useMemo(() => filterLights(sortedDetections), [sortedDetections]);
  const portCount = useMemo(() => countPorts(labeledDetections), [labeledDetections]);

  return {
    lightStatus: lights,
    isFlipped: portCount > 2,
  };
};


// lights.length === 6
//     ? lights.map(light => light.label === 'lightg')
//     : Array(6).fill(false);