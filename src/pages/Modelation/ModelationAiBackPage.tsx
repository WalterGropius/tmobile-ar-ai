import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';

export const ModelationAiBackPage = () => {
  const { redirectToStep } = useModelationRouter();

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
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('powerAnim')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('arFront')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
