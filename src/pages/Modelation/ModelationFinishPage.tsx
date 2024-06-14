//done
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';

export const ModelationFinishPage = () => {
  const { redirectToStep, redirectToPage } = useModelationRouter();

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('aiFront')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToPage('fin')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
