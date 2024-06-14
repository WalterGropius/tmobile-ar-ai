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
  detections: unknown;
  handleExecute: () => void;
};

export const ModelationAiFrontPage: FC<Props> = ({ detections, handleExecute }) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();
  // TODO: Udelej jako jeden state, nepouzivej race-condition (opet chyba), pojmenuj veci podle toho, co skutecne delaji.
  // TODO: Nazev buttonText prejmenuj na to, co to znamena dle byznys logiky, napr. isLoading, isProcessing, ...
  // TODO: isButtonDisabled je pravdepodnbe race-condition s prvnim stavem.
  // TODO: Mozna pujde udelat jako tri-stavovy storage useState<'init' | 'loading' | 'done'>('init');
  const [buttonText, setButtonText] = useState('Zkontrolovat');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const lightStatus = useFrontDetections(detections as Detection[]);


  const handleButtonClick = () => {
    
    handleExecute();
    setButtonText('Kontrola');
  };

  useEffect(() => {
    if (buttonText === 'Pokračovat') {
      redirectToPage('fin');
    }
  }, [buttonText, redirectToPage]);


  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          <h1>Zapojení AI</h1>
          <h4>Výsledný stav (proces může trvat až 2 minuty)</h4>
          <LightIndicator statusList={lightStatus} />
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('arFront')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={handleButtonClick} disabled={isButtonDisabled}>
                {buttonText}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
