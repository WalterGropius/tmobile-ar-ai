import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { useState, useEffect } from 'react';
import { LightIndicator } from '../../ui/LightIndicator';
import { FC } from 'react';

type Props = {
  detections: unknown;
  handleExecute: () => void;
};


export const ModelationAiFrontPage: FC<Props> = ({ detections, handleExecute }) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();
  const [buttonText, setButtonText] = useState('Zkontrolovat');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  /* 
  const filterByLabelIncludes = (filterLabel) =>
    posLabels.filter(({ label }) => label.includes(filterLabel));
  
  const filterByLabel = (filterLabel) =>
    posLabels.filter(({ label }) => label === filterLabel);

  // There are multiple port and ind classes, we want to count them all
  const portCount = filterByLabelIncludes("port").length;
  const indCount = filterByLabelIncludes("ind").length;

  const lightoffCount = filterByLabel("lightoff").length;
  const lightonCount = filterByLabel("lightg").length;
  const lights = filterByLabelIncludes("light");

  const portpowExists = filterByLabel("portpow");
  const portdslExists = filterByLabel("portdsl");
  const portwanExists = filterByLabel("portwan");

  const cabpowExists = filterByLabel("cabpow");
  const cabdslExists = filterByLabel("cabdsl");
  const cabwanExists = filterByLabel("cabwan");

  
  const data = {
    lightoffCount,
    portCount,
    indCount,
    lightonCount,
    lights,
    portdslExists,
    cabdslExists,
    cabwanExists,
    portpowExists,
    portwanExists,
    cabpowExists,
  };

  console.table(data);

const processDetections = (detections) => {
  const posLabels = detections.map((det) => {
    const label = labels[det[5]];
    const score = (det[4] * 100).toFixed(2);
    const pos = parseInt(det[0]);
    return {
      xPosition: pos,
      label: label,
    };
  });

  posLabels.sort((a, b) => a.xPosition - b.xPosition);
  console.table(posLabels);
  return posLabels;
};




const processFrontSide = ({
  lightoffCount,
  portCount,
  lightonCount,
  lights,
}) => {
  console.log("front");
  if (lights.length === 6) {
    console.log(lights);
  } else {
    if (lightoffCount >= 5) {
      console.log("zapn");
    }

    if (portCount >= 4) {
      console.log("turn around");
    }

     if (lightonCount >= 4) {
    console.log("Correct");
  }
};
 */


  const handleButtonClick = () => {
    setIsButtonDisabled(true);
    handleExecute();
    setTimeout(() => {
      setButtonText('Pokračovat');
      setIsButtonDisabled(false);
    }, 5000);
  };

  useEffect(() => {
    if (buttonText === 'Pokračovat') {
      redirectToPage('fin');
    }
  }, [buttonText, redirectToPage]);

  const processDetections = () => {
    console.log(detections);
    return [false, false, false, false, false, false];
  };


  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          <h1>Zapojení AI</h1>
          <h4>Vsledn stav (proces může trvat až 2 minuty)</h4>
          <LightIndicator statusList={processDetections()} />
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('arFront')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleButtonClick} 
                disabled={isButtonDisabled}
              >
                {buttonText}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}};