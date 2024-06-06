import { Box, Container } from '@mui/material';
import { ColorGrid } from '../documentation/ColorGrid';

export const Documentation = () => {
  return (
    <Container>
      <Box>
        <h1>APP Documentation</h1>
        <h2>Color</h2>
        <ColorGrid />
        <h2>Components</h2>
      </Box>
    </Container>
  );
};
