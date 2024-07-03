import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button, Typography } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { useState, useEffect } from 'react';
import { LightIndicator } from '../../ui/LightIndicator';
import { FC } from 'react';
import useFrontDetections from '../../hooks/useFrontDetetections';
import { Detection } from '../../types/modelation';
import { Notification } from '../../ui/Notification';

type Props = {
  labeledDetections: Detection[];
  handleExecute: () => void;
};

export const ModelationAiFrontPage: FC<Props> = ({ labeledDetections, handleExecute }) => {
  const {redirectToStep,redirectToPage } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const {lightStatus, isFlipped} = useFrontDetections(labeledDetections);

  const executeDetect = () => {
    setButtonState('loading');
    setTimeout(() => {
      handleExecute();
      setButtonState('done');
    }, 1000);
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
    if (buttonClickCount >= 5 || (lightStatus[0] && lightStatus[1] && lightStatus[2])) {
     
     setTimeout(() => {
       redirectToPage("fin");
     }, 1000);
    }
  }, [buttonClickCount, lightStatus]);

  return (
    <Box>
      <Box sx={{ m:2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
          <Typography sx={{marginBottom:'38px'}} variant="h2">Namiřte na přední stranu modemu</Typography>
          <Typography  variant="h4">Výsledný stav (proces může trvat až 2 minuty)</Typography>
          <LightIndicator statusList={lightStatus} />
          {isFlipped && <Notification title="Otočte modem" message="Je potřeba zkontrolovat napojení kabelů." />}
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