import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button, Typography } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { Notification } from '../../ui/Notification';
import { useState, useEffect, useCallback } from 'react';
import useBackPowDetect from '../../hooks/useBackPowDetect';
import { FC } from 'react';
import { ModelationAiBackPowPageProps } from '../../types/modelation';

export const ModelationAiBackPowPage: FC<ModelationAiBackPowPageProps> = ({ labeledDetections, handleExecute }) => {
  const { redirectToStep } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const cableStatus = useBackPowDetect(labeledDetections);

  const executeDetect = useCallback(() => {
    setButtonState('loading');
    setTimeout(() => {
      handleExecute();
      setButtonState('done');
    }, 1000);
  }, [handleExecute]);

  const handleButtonClick = useCallback(() => {
    setButtonClickCount(prevCount => prevCount + 1);
    executeDetect();
  }, [executeDetect]);


  useEffect(() => {
    if (buttonState === 'done') {
      setButtonState('init');
    }
  }, [buttonState]);

  useEffect(() => {
    if (buttonClickCount >= 5 || cableStatus === 'correct') {
      setTimeout(() => {
        redirectToStep('powButt');
      }, 1000);
    }
  }, [buttonClickCount, cableStatus, redirectToStep]);

  const renderCableStatus = () => {
    switch (cableStatus) {
      case 'correct':
        return <Typography variant="h2">Spravné zapojení ✓</Typography>;
      case 'error':
        return (
          <Notification
            title="Nespravné zapojení"
            message="Zkontrolujte prosím připojení napájecího kabelu a zkuste to znovu."
          />
        );
      case 'flip':
        return <Notification title="Otočte modem" message="Je potřeba zkontrolovat napájecí kabel." />;
      case 'no-cabPow':
        return <Notification title="Chyba Analýzy" message="Kabel nenalezen." />;
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
          <Typography variant="h2">Namiřte na zadní část modemu</Typography>
          <Typography sx={{ my: '24px' }} variant="h4">
            Výsledný stav (proces může trvat až 2 minuty)
          </Typography>

          {renderCableStatus()}

          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('aiBackCab')}>
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
