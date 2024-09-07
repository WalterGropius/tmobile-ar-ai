import { Link, useSearchParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { Drawer } from '../ui/Drawer';

export const ConnectionInfoPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 0.5)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Drawer open={true}>
        <Typography variant="h1">Co je potřeba na instalaci modemu?</Typography>
        <Box>
          <p>Položte si modem na prázdný tmavý stůl tak, abyste viděli v dolní části na konektory.</p>
          <p>Připravte si kabel pro propojení zásuvky k modemu.</p>
          <p>Mějte po ruce také zdrojový kabel pro připojení modemu do elektřiny.</p>
        </Box>
        <Link to={`/ar-viewer`}>
          <Button sx={{ width: '100%' }} variant="contained">
            Pokračovat
          </Button>
        </Link>
      </Drawer>
    </Box>
  );
};
