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
  clearDetections: () => void;
};

export const ModelationAiFrontPage: FC<Props> = ({ labeledDetections, handleExecute, clearDetections }) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const { lightStatus, isFlipped } = useFrontDetections(labeledDetections);

  const debug = false;
  const executeDetect = useCallback(() => {
    setButtonState('loading');
    setTimeout(() => {
      handleExecute();
      setButtonState('done');
    }, 1000);
  }, [handleExecute]);

  const allLightsOn = lightStatus[0] && lightStatus[1] && (lightStatus[2] || lightStatus[3]);

  const handleButtonClick = useCallback(() => {
    if (allLightsOn) {
      redirectToPage('fin');
    } else {
      setButtonClickCount((prevCount) => prevCount + 1);
      executeDetect();
    }
  }, [allLightsOn, executeDetect, redirectToPage]);

  useEffect(() => {
    if (buttonState === 'done') {
      setButtonState('init');
    }
  }, [buttonState]);

  useEffect(() => {
    if (buttonClickCount >= 30) {
      setTimeout(() => {
        redirectToPage('fin');
      }, 3000);
    }
  }, [buttonClickCount, redirectToPage]);

  useEffect(() => {
    clearDetections();
  }, []);

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
          <Typography sx={{ marginBottom: '38px' }} variant="h2">
            Kontrola správného zapojení modemu
          </Typography>
          <Typography variant="h4">Výsledný stav (proces může trvat až 2 minuty)</Typography>
          <LightIndicator statusList={lightStatus} />
          {isFlipped && <Notification title="Otočte modem" message="Je potřeba zkontrolovat indikátory." />}
          {!allLightsOn && buttonState !== 'loading' && buttonClickCount > 0 && (
            <Notification title="Vyčkejte až uběhne 10 minut od stisknutí tlačítka ON. Pokud již 10 minut uběhlo, doporučujeme celý postup od začátku znovu zopakovat." />
          )}
          {buttonState === 'loading' && <Notification title="Kontrola" message="Kontroluji stav indikátorů." />}
          {allLightsOn && buttonState !== 'loading' && buttonClickCount > 0 && (
            <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'green', fontSize: 32 }}>
              Správné zapojení ✓
            </Typography>
          )}
          {debug && (
            <Typography sx={{ color: 'red' }}>
              {labeledDetections
                .sort((a, b) => a.yPos - b.yPos)
                .map((detection) => detection.label)
                .join(', ')}
            </Typography>
          )}
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('powButt', false)}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={handleButtonClick} disabled={buttonState === 'loading'}>
                {allLightsOn ? 'Pokračovat' : buttonState === 'loading' ? 'Kontrola' : 'Zkontrolovat'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
