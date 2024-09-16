//page7
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button, Typography } from '@mui/material';
import { Drawer } from '../../ui/Drawer';

export const ModelationArPowButtPage = () => {
  const { redirectToStep } = useModelationRouter();

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>

      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
          <Typography variant="h2">Modem zapněte stisknutím tlačítka ON/OFF</Typography>
          <Typography variant="h4">
            První zapnutí modemu může trvat až 10 minut, proto si před pokračováním dopřejte krátkou pauzu.
          </Typography>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('aiBackPow', false)}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('aiFront')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
