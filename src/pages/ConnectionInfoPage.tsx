import { Link, useSearchParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Drawer } from '../ui/Drawer';

export const ConnectionInfoPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <Drawer open={true}>
      <h1>Co je potřeba na instalaci modemu?</h1>
      <Box>
        <p>Položte si modem na prázdný tmavý stůl tak, abyste viděli v dolní části na konektory.</p>
        <p>Připravte si kabel pro propojení zásuvky k modemu.</p>
        <p>Mějte po ruce také zdrojový kabel pro připojení modemu do elektřiny.</p>
      </Box>
      <Link to={`/ar-viewer?connection=${searchParams.get('connection')}`}>
        <Button sx={{ width: '100%' }} variant="contained">
          Pokračovat
        </Button>
      </Link>
    </Drawer>
  );
};