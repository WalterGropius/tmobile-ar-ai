import { Box, Button, Container } from '@mui/material';
import { MainTitle } from '../ui/MainTitle';
import { Footer } from '../components/Footer';
import { Color } from '../core/theme/color';
import { Link } from 'react-router-dom';

export const HomePage = () => (
  <Container sx={{ py: 3 }}>
    <MainTitle>Instalace modemu v&nbsp;rozšířené realitě</MainTitle>
    <Box sx={{ background: Color.lightGrey, p: 4, borderRadius: 4, my: 4 }}>
      <h2>Zyxel</h2>
      <h4>VMG3625-T509</h4>
      <Box sx={{ textAlign: 'center' }}>
        <Box component="img" src="/ui/fromfigma/modem.png" alt="modem" sx={{ width: '80%' }} />
      </Box>
    </Box>
    <Footer>
      <Link to="/connection-type">
        <Button variant="contained" sx={{ width: '100%' }}>
          Jdu na to
        </Button>
      </Link>
    </Footer>
  </Container>
);
