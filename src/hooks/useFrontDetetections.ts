import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';

const sortDetections = (labeledDetections: Detection[]): Detection[] => 
    labeledDetections.sort((a, b) => a.xPos - b.xPos);

const filterLights = (detections: Detection[]): boolean[] => {
    const lights = detections.filter(({ label }) => label && label.includes('light'));
    console.log('Filtered Lights:', lights); 
    if (lights.length === 6) {
        return lights.map(light => light.label === 'lightg');
    }
    return Array(6).fill(false);
};

const useFrontDetections = (labeledDetections: Detection[]): { lightStatus: boolean[], isFlipped: boolean } => {
    const [lightStatus, setLightStatus] = useState<boolean[]>([]);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
   
    
    useEffect(() => {
            const hasMultiplePorts = labeledDetections.filter(({ label }) => label === 'port').length > 3;
            setIsFlipped(hasMultiplePorts);
            const sortedDetections = sortDetections(labeledDetections);
            const lights = filterLights(sortedDetections);
            console.log('Light Status:', lights);
            setLightStatus(lights);
            
        
    }, [labeledDetections]);

    return {lightStatus, isFlipped};
};

export default useFrontDetections;