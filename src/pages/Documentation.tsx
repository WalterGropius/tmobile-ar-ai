import { Box, Container } from '@mui/material';
import { LightIndicator } from '../ui/LightIndicator';
import { ColorGrid } from '../documentation/ColorGrid';
import { Card } from '../ui/Card';

export const Documentation = () => {
  return (
    <Container>
      <Box>
        <h1>APP Documentation</h1>
        <h2>Color</h2>
        <ColorGrid />
        <h2>Components</h2>
        <h3>Status list</h3>
        <Card title="No status">
          <LightIndicator statusList={[]} />
        </Card>
        <Card title="[true, true]">
          <LightIndicator statusList={[true, true]} />
        </Card>
        <Card title="[true, false, true]">
          <LightIndicator statusList={[true, false, true]} />
        </Card>
        <Card title="[false, false, false]">
          <LightIndicator statusList={[false, false, false]} />
        </Card>
        <Card title="[true, true, true]">
          <LightIndicator statusList={[true, true, true]} />
        </Card>
      </Box>
    </Container>
  );
};
