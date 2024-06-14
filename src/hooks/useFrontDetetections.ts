import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';

const sortDetections = (labeledDetections: Detection[]): Detection[] => 
    labeledDetections.sort((a, b) => a.xPos - b.xPos);

const filterLights = (detections: Detection[]): boolean[] => {
    const lights = detections.filter(({ label }) => label && label.includes('light'));
    console.log('Filtered Lights:', lights); // Debugging line
    return Array.from({ length: 6 }, (_, index) => lights[index]?.label === 'lightg' || false);
};

const useFrontDetections = (labeledDetections: Detection[]): boolean[] => {
    const [lightStatus, setLightStatus] = useState<boolean[]>([]);

    useEffect(() => {
        
            const sortedDetections = sortDetections(labeledDetections);
            const lights = filterLights(sortedDetections);
            console.log('Light Status:', lights); // Debugging line
            setLightStatus(lights);
            
        
    }, [labeledDetections]);

    return lightStatus;
};

export default useFrontDetections;