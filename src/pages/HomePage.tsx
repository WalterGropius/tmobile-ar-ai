import { Box, Button } from '@mui/material';
import { HeaderTitle } from '../components/HeaderTitle';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const HomePage = () => (
  <Box>
    <HeaderTitle>
      <h1>Návod na instalaci v rozšířené realitě</h1>
    </HeaderTitle>
    <h2>Zyxel</h2>
    <h3>VMG3625-T50B</h3>
    <img src="/zyxel.png" alt="Zyxel Router" />
    <Footer>
    
      <Link to="/connection-type">
        <Button variant="contained" fullWidth>
          Start
        </Button>
      </Link>
    </Footer>
  </Box>
);
