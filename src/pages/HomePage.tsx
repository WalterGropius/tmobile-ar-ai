import { Box, Button, Container } from '@mui/material';
import { MainTitle } from '../ui/MainTitle';
import { Footer } from '../components/Footer';
import { Color } from '../core/theme/color';
import { Link } from 'react-router-dom';

export const HomePage = () => (
  <Container sx={{ py: 3 }}>
    <MainTitle>
      Instalace modemu
      <br />v rozšířené realitě
    </MainTitle>

    <Box sx={{ background: Color.lightGrey, p: 3, borderRadius: 4, my: 4 }}>
      <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 4px 0' }}>Technicolor</h2>
      <h4 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0' }}> CGA4336</h4>
      <Box sx={{ textAlign: 'center' }}>
        <Box component="img" src="/tv.png" alt="modem" sx={{ width: '80%' }} />
      </Box>
    </Box>
    <Footer>
      <Link to="/connection-info" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Jdu na to
        </Button>
      </Link>
    </Footer>
  </Container>
);
