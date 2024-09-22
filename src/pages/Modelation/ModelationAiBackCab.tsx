//page4
import { useState, useEffect, useCallback, FC } from 'react';
import { ModelationAiBackCabPageProps } from '../../types/modelation';
import { Box, Button, Typography } from '@mui/material';
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { useRfCabDetect } from '../../hooks/useRfCabDetect';
import { Notification } from '../../ui/Notification';
import { StatusBanner } from '../../ui/StatusBanner';
import { Drawer } from '../../ui/Drawer';

export const ModelationAiBackCabPage: FC<ModelationAiBackCabPageProps> = ({
  labeledDetections,
  handleExecute,
  clearDetections,
}) => {
  const { redirectToStep } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const cabStatus = useRfCabDetect(labeledDetections);
  const debug = false;
  const executeDetect = useCallback(() => {
    setButtonState('loading');
    setTimeout(() => {
      handleExecute();
      setButtonState('done');
    }, 1000);
  }, [handleExecute]);

  const handleButtonClick = useCallback(() => {
    if (cabStatus === 'correct') {
      redirectToStep('powerAnim');
    } else {
      setButtonClickCount((prevCount) => prevCount + 1);
      executeDetect();
    }
  }, [cabStatus, executeDetect, redirectToStep]);

  useEffect(() => {
    if (buttonState === 'done') {
      setButtonState('init');
    }
  }, [buttonState]);

  useEffect(() => {
    if (buttonClickCount >= 30) {
      setTimeout(() => {
        redirectToStep('powerAnim');
      }, 5000);
    }
  }, [buttonClickCount, redirectToStep]);

  /*   useEffect(() => {
    executeDetect();
  }, []); */
  useEffect(() => {
    clearDetections();
  }, []);

  const renderCabStatus = () => {
    if (buttonClickCount === 0 || buttonState === 'loading') {
      return null;
    }
    switch (cabStatus) {
      case 'correct':
        return (
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'green', fontSize: 32 }}>
            Správné zapojení ✓
          </Typography>
        );
      case 'error':
        return (
          <Notification
            title="Chyba"
            message="Chyba, koaxiální kabel není zapojený správně, vraťte se do předcházejícího kroku a postup opakujte."
          />
        );
      case 'no-cab':
        return (
          <Notification
            title="Chyba"
            message="Chyba, koaxiální kabel není zapojený správně, vraťte se do předcházejícího kroku a postup opakujte."
          />
        );
      case 'flip':
        return <Notification title="Otočte modem" message={`Je potřeba zkontrolovat zapojení`} />;
      default:
        return <Typography variant="h4">Probíhá AI kontrola...</Typography>;
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
            Kontrola správného zapojení koaxiálního kabelu do RF na modemu
          </Typography>
          <Typography variant="h2">Namiřte na zadní část modemu</Typography>
          <Typography sx={{ my: '24px' }} variant="h4">
            Výsledný stav (proces může trvat až 2 minuty)
          </Typography>

          {renderCabStatus()}
          {debug && (
            <Typography sx={{ color: 'red' }}>
              {labeledDetections.map((detection) => detection.label).join(', ')}
            </Typography>
          )}
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('cableAnim', false)}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={handleButtonClick} disabled={buttonState === 'loading'}>
                {cabStatus === 'correct' ? 'Pokračovat' : buttonState === 'loading' ? 'Kontrola' : 'Zkontrolovat'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
