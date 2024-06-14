import { useState, useEffect } from 'react';
import { Detection } from '../types/modelation';

const useFrontDetections = (detections: Detection[]) => {
  const [lightStatus, setLightStatus] = useState<boolean[]>([]);

  useEffect(() => {
    const processDetections = (detections: Detection[]) => {
      const posLabels = detections.map((det) => {
        return {
          xPosition: det.xPosition,
          label: det.label,
        };
      });

      posLabels.sort((a, b) => a.xPosition - b.xPosition);

      const lights = posLabels.filter(({ label }) => label.includes('light'));
      const lightStatusArray = Array(6).fill(false);

      lights.forEach((light, index) => {
        if (index < 6) {
          lightStatusArray[index] = light.label === 'lighton';
        }
      });

      return lightStatusArray;
    };

    setLightStatus(processDetections(detections));
  }, [detections]);

  return lightStatus;
};

export default useFrontDetections;
