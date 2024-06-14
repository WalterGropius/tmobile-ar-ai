import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { useState, useEffect } from 'react';
import { LightIndicator } from '../../ui/LightIndicator';

type Props = {
  detections: unknown;
  handleExecute: () => void;
};

export const ModelationAiFrontPage: FC<Props> = ({ detections, handleExecute }) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();
  const [buttonText, setButtonText] = useState('Zkontrolovat');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
    return [true, true, true, true, true, true];
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
};
