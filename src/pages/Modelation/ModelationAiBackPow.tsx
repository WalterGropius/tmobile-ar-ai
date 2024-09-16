//page6
import { useState, useEffect, useCallback } from 'react';
import { ModelationAiBackPowPageProps } from '../../types/modelation';
import { Box, Button, Typography } from '@mui/material';
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { useBackPowDetect } from '../../hooks/useBackPowDetect';
import { StatusBanner } from '../../ui/StatusBanner';
import { Notification } from '../../ui/Notification';
import { Drawer } from '../../ui/Drawer';
import { FC } from 'react';

export const ModelationAiBackPowPage: FC<ModelationAiBackPowPageProps> = ({ labeledDetections, handleExecute }) => {
  const { redirectToStep } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const cableStatus = useBackPowDetect(labeledDetections);
  const debug = false;
  const executeDetect = useCallback(() => {
    setButtonState('loading');
    setTimeout(() => {
      handleExecute();
      setButtonState('done');
    }, 1000);
  }, [handleExecute]);

  const handleButtonClick = useCallback(() => {
    if (cableStatus === 'correct') {
      redirectToStep('powButt');
    } else {
      setButtonClickCount((prevCount: number) => prevCount + 1);
      executeDetect();
    }
  }, [cableStatus, executeDetect, redirectToStep]);

  useEffect(() => {
    if (buttonState === 'done') {
      setButtonState('init');
    }
  }, [buttonState]);

  useEffect(() => {
    if (buttonClickCount >= 30) {
      setTimeout(() => {
        redirectToStep('powButt');
      }, 3000);
    }
  }, [buttonClickCount, redirectToStep]);

  /*  useEffect(() => {
    executeDetect();
  }, []); */

  const renderCableStatus = () => {
    if (buttonClickCount === 0 || buttonState === 'loading') {
      return null;
    }
    switch (cableStatus) {
      case 'correct':
        return (
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Správné zapojení ✓
          </Typography>
        );
      case 'error':
        return (
          <Notification title="Chyba" message="Zkontrolujte prosím připojení napájecího kabelu a zkuste to znovu." />
        );
      case 'flip':
        return <Notification title="Otočte modem" message="Je potřeba zkontrolovat napájecí kabel." />;
      case 'no-cabPow':
        return (
          <Notification
            title="Chyba"
            message="Chyba, napájecí kabel není zapojený správně, vraťte se do předcházejícího kroku a postup opakujte."
          />
        );
      default:
        return <Typography variant="h4">Probihá AI kontrola...</Typography>;
    }
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Kontrola správného zapojení napájecího kabelu do modemu
          </Typography>
          <Typography variant="h2">Namiřte na zadní část modemu</Typography>
          <Typography sx={{ my: '24px' }} variant="h4">
            Výsledný stav (proces může trvat až 2 minuty)
          </Typography>

          {renderCableStatus()}
          {debug && (
            <Typography sx={{ color: 'red' }}>
              {labeledDetections.map((detection) => detection.label).join(', ')}
            </Typography>
          )}
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('aiBackCab', false)}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={handleButtonClick} disabled={buttonState === 'loading'}>
                {cableStatus === 'correct' ? 'Pokračovat' : buttonState === 'loading' ? 'Kontrola' : 'Zkontrolovat'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
