import { Box, Button, Container } from '@mui/material';
import { LightIndicator } from '../ui/LightIndicator';
import { ColorGrid } from '../documentation/ColorGrid';
import { Card } from '../ui/Card';
import { PhoneScreen } from '../documentation/phoneScreen';
import { StatusBanner } from '../ui/StatusBanner';
import { ConnectionBox } from '../ui/ConnectionBox';
import { InfoButton } from '../ui/Buttons/InfoButton';
import { SelectButton } from '../ui/Buttons/SelectButton';
import { Notification } from '../ui/Notification';
import { IndicatorInfoList } from '../ui/IndicatorInfoList';
import { Drawer } from '../ui/Drawer';
import { useState } from 'react';

export const Documentation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Container>
      <Box>
        <h1>APP Documentation</h1>
        <h2>Color</h2>
        <ColorGrid />
        <h2>Components</h2>
        <h3>Buttons</h3>
        <Card title="Primary contained">
          <Button variant="contained">Pokračovat</Button>
        </Card>
        <Card title="Secondary outlined">
          <Button variant="outlined">Zpět</Button>
        </Card>
        <Card title="InfoButton">
          <InfoButton />
        </Card>
        <Card title="SelectButton">
          <SelectButton>Vybrat</SelectButton>
        </Card>
        <Card title="Notification">
          <Notification title="Chyba" message="Něco se nepovedlo" />
        </Card>
        <Card title="IndicatorInfoList">
          <IndicatorInfoList title="Indicator Info List" subtitle="Subtitle" list={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']} />
        </Card>

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
        <h3>Test Screens</h3>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <PhoneScreen>
          <StatusBanner status="aicontrol" />
        </PhoneScreen>
        <PhoneScreen>
          <StatusBanner status="ardetect" />
        <Button variant="contained" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box>
            <h2>Nadpis</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </Box>
        </Drawer>
        </PhoneScreen></Box>
        <PhoneScreen>
          <ConnectionBox title="Connection Box" subtitle="Subtitle" imageSrc="https://via.placeholder.com/150" imageAlt="Image Alt" />
        </PhoneScreen>
      </Box>
    </Container>
  );
};
