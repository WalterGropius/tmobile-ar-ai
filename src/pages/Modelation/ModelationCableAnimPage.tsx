import { useModelationRouter } from '../../hooks/useModelationRouter';
import { ConnectionType } from '../../types/connection';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { ReactNode } from 'react';
import { Drawer } from '../../ui/Drawer';

export const ModelationCableAnimPage = () => {
  const { redirectToStep, connectionType } = useModelationRouter();

  const instructions: Record<ConnectionType, ReactNode> = {
    DSL: <>Do vyznačené zdířky zapojte telefonní kabel (ten s užším konektorem)</>,
    WAN: <>Do vyznačené zdířky zapojte LAN kabel (ten se širším konektorem)</>,
    OPTIC: <>Do vyznačené zdířky zapojte LAN kabel (ten se širším konektorem)</>,
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
      <Drawer open={true}>
        <h1>{instructions[connectionType]}</h1>
        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('aiBack')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('powerAnim')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
