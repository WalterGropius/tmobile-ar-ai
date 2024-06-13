import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';

export const ModelationStartPage = () => {
  const { redirectToStep, redirectToPage } = useModelationRouter();

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          <h1>Co je potřeba na instalaci modemu?</h1>
          <Box>
            <p>Položte si modem na prázdný tmavý stůl tak, abyste viděli v dolní části na konektory.</p>
            <p>Připravte si kabel pro propojení zásuvky k modemu.</p>
            <p>Mějte po ruce také zdrojový kabel pro připojení modemu do elektřiny.</p>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToPage('connection-type')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('arBack')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
