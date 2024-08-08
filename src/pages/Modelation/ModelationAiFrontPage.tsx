//page8
import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { useFrontDetections } from '../../hooks/useFrontDetetections';
import { LightIndicator } from '../../ui/LightIndicator';
import { StatusBanner } from '../../ui/StatusBanner';
import { Notification } from '../../ui/Notification';
import { Detection } from '../../types/modelation';
import { Drawer } from '../../ui/Drawer';
import { FC } from 'react';

type Props = {
  labeledDetections: Detection[];
  handleExecute: () => void;
};

export const ModelationAiFrontPage: FC<Props> = ({ labeledDetections, handleExecute }) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const { lightStatus, isFlipped } = useFrontDetections(labeledDetections);
  const debug = true;
  const executeDetect = useCallback(() => {
    setButtonState('loading');
    setTimeout(() => {
      handleExecute();
      setButtonState('done');
    }, 1000);
  }, [handleExecute]);

  const handleButtonClick = useCallback(() => {
    setButtonClickCount((prevCount) => prevCount + 1);
    executeDetect();
  }, [executeDetect]);

  useEffect(() => {
    if (buttonState === 'done') {
      setButtonState('init');
    }
  }, [buttonState]);

  useEffect(() => {
    const allLightsOn = lightStatus[0] && lightStatus[1] && lightStatus[2];
    if (buttonClickCount >= 30 || allLightsOn) {
      setTimeout(() => {
        redirectToPage('fin');
      }, 3000);
    }
  }, [buttonClickCount, lightStatus, redirectToPage]);

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
          <Typography sx={{ marginBottom: '38px' }} variant="h2">
            Namiřte na přední stranu modemu
          </Typography>
          <Typography variant="h4">Výsledný stav (proces může trvat až 2 minuty)</Typography>
          <LightIndicator statusList={lightStatus} />
          {isFlipped && <Notification title="Otočte modem" message="Je potřeba zkontrolovat indikátory." />}
          {debug && (
            <Typography sx={{ color: 'red' }}>
              {labeledDetections.map((detection) => detection.label).join(', ')}
            </Typography>
          )}
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('arFront', true)}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={handleButtonClick} disabled={buttonState === 'loading'}>
                {buttonState === 'loading' ? 'Kontrola' : 'Zkontrolovat'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
