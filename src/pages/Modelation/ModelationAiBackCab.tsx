import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button, Typography } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { Notification } from '../../ui/Notification';
import { useState, useEffect, useCallback, FC } from 'react';
import useBackCabDetect from '../../hooks/useBackCabDetect';
import { ModelationAiBackCabPageProps } from '../../types/modelation';

export const ModelationAiBackCabPage: FC<ModelationAiBackCabPageProps> = ({
  labeledDetections,
  connectionType,
  handleExecute,
}) => {
  const { redirectToStep } = useModelationRouter();
  const [buttonState, setButtonState] = useState<'init' | 'loading' | 'done'>('init');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const cabStatus = useBackCabDetect(labeledDetections, connectionType);

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
    if (buttonClickCount >= 3 || cabStatus === 'correct') {
      setTimeout(() => {
        redirectToStep('powerAnim');
      }, 1000);
    }
  }, [buttonClickCount, cabStatus, redirectToStep]);

  const renderCabStatus = () => {
    switch (cabStatus) {
      case 'correct': return <Typography variant="h2">Správné zapojení ✓</Typography>;
      case 'error': return <Notification title="Chyba Analýzy" message="Ujistěte se, že je modem správně otočen a dobře viditelný." />;
      case 'wrong-cab': return <Notification title="Nesprávné zapojení" message={`Zapojte ${connectionType === 'DSL' ? 'DSL' : 'WAN'} kabel do portu ${connectionType === 'DSL' ? 'DSL' : 'WAN' }.`} />;
      case 'no-cab': return <Notification title="Chyba Analýzy" message="Kabel nenalezen." />;
      case 'flip': return <Notification title="Otočte modem" message={`Je potřeba zkontrolovat zapojení ${connectionType}`} />;
      default: return <Typography variant="h4">Probíhá AI kontrola...</Typography>;
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

          {renderCabStatus()}
          {JSON.stringify(labeledDetections)}
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('cableAnim')}>
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
