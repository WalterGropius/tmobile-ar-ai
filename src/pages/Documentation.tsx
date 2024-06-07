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
import { Color } from '../core/theme/color';

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
          <IndicatorInfoList
            title="Namiřte na přední stranu modemu."
            subtitle="Kontrolky znamenají toto:"
            list={['Napájení', 'DSL', 'Internet', 'Lan 1-4', 'Wi-Fi 2.5 Ghz', 'Wi-Fi 5Ghz']}
          />
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

        <h3>Drawer</h3>
        <Card title="Drawer">
          <Drawer>
            <IndicatorInfoList
              title="Namiřte na přední stranu modemu."
              subtitle="Kontrolky znamenají toto:"
              list={['Napájení', 'DSL', 'Internet', 'Lan 1-4', 'Wi-Fi 2.5 Ghz', 'Wi-Fi 5Ghz']}
            />
          </Drawer>
        </Card>

        <h3>App Screens</h3>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(375px, 1fr))' }}>
          <PhoneScreen>
            <h2>Instalace modemu v rozšířené realitě</h2>
            <Box sx={{ background: Color.lightGrey, p: 4, borderRadius: 4, my: 4 }}>
              <h2>Zyxel</h2>
              <h4>VMG3625-T509</h4>
              <Box sx={{ textAlign: 'center' }}>
                <Box component="img" src="/ui/fromfigma/modem.png" alt="modem" sx={{ width: '80%' }} />
              </Box>
            </Box>
            <Button variant="contained" sx={{ width: '100%', my: 6 }}>
              Pokračovat
            </Button>
          </PhoneScreen>

          <PhoneScreen>
            <h2>Co je potřeba na instalaci modemu?</h2>
            <Box>
              <Box>
                <h5>Položte si modem na prázdn tmav stůl tak, abyste viděli v dolní části na konektory.</h5>
                <h5>Připravte si kabel pro propojení zásuvky k modemu.</h5>
                <h5>Mějte po ruce také zdrojový kabel pro připojení modemu do elektřiny.</h5>
              </Box>
              <Button sx={{ width: '100%' }} variant="contained">
                Pokračovat
              </Button>
            </Box>
          </PhoneScreen>

          <PhoneScreen>
            <h2>Vyberte svůj typ online připojení</h2>
            <ConnectionBox
              title="DSL"
              subtitle="Jde o připojení modemu do telefonní zásuvkyv rámci tarifů xDSL."
              imageSrc="/ui/fromfigma/modem.png"
              imageAlt="Image Alt"
            />
            <ConnectionBox
              title="Optic"
              subtitle="Případ, kdy je modem připojen do optického převodníku v rámci tarifů FTTx."
              imageSrc="/ui/fromfigma/modem.png"
              imageAlt="Image Alt"
            />
            <ConnectionBox
              title="DSL přes terminátor"
              subtitle="Připojení modemu přes takzvaný Terminátor."
              imageSrc="/ui/fromfigma/modem.png"
              imageAlt="Image Alt"
            />
            <Button sx={{ width: '100%' }} variant="contained">
              Pokračovat
            </Button>
          </PhoneScreen>

          <PhoneScreen>
            <StatusBanner status="ardetect" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" sx={{ flex: 1, mr: 1 }}>
                Zpět
              </Button>
              <Button variant="contained" sx={{ flex: 2 }}>
                Pokračovat
              </Button>
            </Box>
          </PhoneScreen>

          <PhoneScreen>
            <StatusBanner status="aicontrol" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" sx={{ flex: 1, mr: 1 }}>
                Zpět
              </Button>
              <Button variant="contained" sx={{ flex: 2 }}>
                Pokračovat
              </Button>
            </Box>
          </PhoneScreen>

          <PhoneScreen>
            <Box
              sx={{ color: Color.white, background: Color.magenta, p: 4, borderRadius: 4, my: 4, textAlign: 'center' }}
            >
              <h6>Zapojení bylo úspěšné ✓</h6>
              <h2>A je to!</h2>
              <h2>Váš modem Zyxel máte úspěšně zapojený.</h2>
              <Box sx={{ textAlign: 'center' }}>
                <Box component="img" src="/ui/fromfigma/modem.png" alt="modem" sx={{ width: '80%', my: 6 }} />
              </Box>
            </Box>
          </PhoneScreen>
        </Box>
      </Box>
    </Container>
  );
};
