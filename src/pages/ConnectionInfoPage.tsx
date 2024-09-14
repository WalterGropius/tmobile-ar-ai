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
          <p>
            Položte modem poblíž koaxiální zásuvky a ideálně na prázdný světlý stůl. Ať jsou dobře viditelné konektory
            na zadní straně modemu.
          </p>
          <img src={'/koax.jpg'} alt="modem" />
          <p>Připravte si koaxiální kabel na propojení modemu s koaxiální zásuvkou.</p>
          <p>Připravte zdrojový kabel na propojení modemu s elektrickou zásuvkou.</p>
        </Box>
        <Link to={`/ar-viewer?step=cableAnim`}>
          <Button sx={{ width: '100%' }} variant="contained">
            Pokračovat
          </Button>
        </Link>
      </Drawer>
    </Box>
  );
};
