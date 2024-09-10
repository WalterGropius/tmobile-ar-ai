//page3
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { ConnectionType } from '../../types/connection';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Drawer } from '../../ui/Drawer';

export const ModelationCableAnimPage = ({ loaded }: { loaded: boolean }) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();

  const instructions: Record<ConnectionType, ReactNode> = {
    DSL: <>Do vyznačené zdířky zapojte coax kabel</>,
    WAN: <>Do vyznačené zdířky zapojte LAN kabel (ten se širším konektorem)</>,
    OPTIC: <>Do vyznačené zdířky zapojte LAN kabel (ten se širším konektorem)</>,
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
      <Drawer open={true}>
        <Typography variant="h2">Zapojení kabelu</Typography>
        <Typography sx={{ my: '24px' }} variant="h4">
          {instructions.DSL}
        </Typography>
        <Box sx={{ my: 0 }}>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToPage('connection-info')} disabled={!loaded}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('aiBackCab')} disabled={!loaded}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
