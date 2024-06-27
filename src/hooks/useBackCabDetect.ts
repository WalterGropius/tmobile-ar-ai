import { useEffect, useState } from 'react';
import { Detection } from '../types/modelation';
import { ConnectionType } from '../types/connection';

const useBackCabDetect = (labeledDetections: Detection[],ConnectionType:ConnectionType) => {
    const [cabStatus, setCabStatus] = useState<'correct' | 'incorrect' | null>(null);

    useEffect(() => {
        const checkCabStatus = () => {
            if (ConnectionType === 'DSL') {
                const hasCabDSL = labeledDetections.some(({ label }) => label === 'cabdsl');
                const hasPortDSL = labeledDetections.some(({ label }) => label === 'portdsl');

                if (hasCabDSL) {
                    console.log("hasCabDSL");
                    if (!hasPortDSL) {
                        setCabStatus('correct');
                        console.log("!hasPortDSL");
                    } else {
                        console.log('Detections:', labeledDetections);
                        setCabStatus('incorrect');
                    }
                }
            } else if (ConnectionType === 'OPTIC' || ConnectionType === 'WAN') {
                const hasCabWAN = labeledDetections.some(({ label }) => label === 'cabwan');
                const hasPortWAN = labeledDetections.some(({ label }) => label === 'portwan');

                if (hasCabWAN) {
                    console.log("hasCabWAN");
                    if (!hasPortWAN) {
                        setCabStatus('correct');
                        console.log("!hasPortWAN");
                    } else {
                        console.log('Detections:', labeledDetections);
                        setCabStatus('incorrect');
                    }
                }
            }
        };

        checkCabStatus();
    }, [labeledDetections, ConnectionType]);

    return cabStatus;
};
export default useBackCabDetect;