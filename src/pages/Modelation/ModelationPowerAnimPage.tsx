//page5
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button, Typography } from '@mui/material';
import { Drawer } from '../../ui/Drawer';

export const ModelationPowerAnimPage = () => {
  const { redirectToStep } = useModelationRouter();

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
      <Drawer open={true}>
        <Typography variant="h2">Zapojení napájecího kabelu</Typography>
        <Typography sx={{ my: '24px' }} variant="h4">
        Do vyznačeného konektoru (POWER) zapojte napájecí kabel. A druhý konec zapojte do zásuvky od elektrické sítě.
        </Typography>

        <Box sx={{ my: 0 }}>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('aiBackCab', true)}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('aiBackPow')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
