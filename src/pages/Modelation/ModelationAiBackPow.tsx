
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { useState, useEffect } from 'react';

export const ModelationAiBackPowPage = () => {
  const { redirectToStep } = useModelationRouter();

  // TODO: Stejna chyba, race condition
  const [buttonText, setButtonText] = useState('Zkontrolovat');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleExecute = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      // TODO: Proc to neni tady? redirectToStep('arFront');
      setButtonText('Pokračovat');
      redirectToStep('aiFront');
      setIsButtonDisabled(false);
    }, 5000);
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
         <h1>Namiřte na zadní část modemu</h1>
         <h4>Výsledný stav (proces může trvat až 2 minuty)</h4>
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
                onClick={handleExecute} 
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
