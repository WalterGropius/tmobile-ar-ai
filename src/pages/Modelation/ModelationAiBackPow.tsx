
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button, Typography } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { useState, useEffect } from 'react';

export const ModelationAiBackCabPage = () => {
  const { redirectToStep } = useModelationRouter();

  const [buttonText, setButtonText] = useState('Zkontrolovat');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleExecute = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setButtonText('Pokračovat');
      redirectToStep('powerAnim');
      setIsButtonDisabled(false);
    }, 5000);
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
        <Typography variant="h2">Namiřte na zadní část modemu</Typography>
         <Typography sx={{my:'24px'}} variant="h4">Výsledný stav (proces může trvat až 2 minuty)</Typography>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('cableAnim')}>
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