import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { useState, useEffect } from 'react';
import { LightIndicator } from '../../ui/LightIndicator';
import { FC } from 'react';
import useFrontDetections from '../../hooks/useFrontDetetections';
import { Detection } from '../../types/modelation';

type Props = {
  labeledDetections: Detection[];
  handleExecute: () => void;
};

export const ModelationAiFrontPage: FC<Props> = ({ labeledDetections, handleExecute }) => {
  const { redirectToStep,redirectToPage } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const lightStatus = useFrontDetections(labeledDetections);

  const executeDetect = () => {
    setButtonState('loading');
    handleExecute();
    setButtonState('done');
  };

  const handleButtonClick = () => {
    setButtonClickCount(prevCount => prevCount + 1);
    executeDetect();
  };

  useEffect(() => {
    executeDetect();
  }, []);

  useEffect(() => {
    if (buttonState === 'done') {
      setButtonState('init');
    }
  }, [buttonState]);

  useEffect(() => {
    if (buttonClickCount >= 5 || JSON.stringify(lightStatus) === JSON.stringify([true, false, false, false, true, true])) {
     
     setTimeout(() => {
       redirectToPage("fin");
     }, 1000);
    }
  }, [buttonClickCount, lightStatus]);

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          <h1>Namiřte na přední stranu modemu</h1>
          <h4>Výsledný stav (proces může trvat až 2 minuty)</h4>
          <LightIndicator statusList={lightStatus} />
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
                disabled={buttonState === 'loading'}
              >
                {buttonState === 'loading' ? 'Kontrola' : 'Zkontrolovat'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};