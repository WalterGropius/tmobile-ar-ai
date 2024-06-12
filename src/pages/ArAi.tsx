import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { Button, Box } from '@mui/material';
import { IndicatorInfoList } from '../ui/IndicatorInfoList';
import { useSearchParams } from 'react-router-dom';
import { StatusBanner } from '../ui/StatusBanner';
import type { Status } from '../ui/StatusBanner';

import { FC, useMemo, useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { useAR } from '../hooks/useAR';
import { useAI } from '../hooks/useAI';

type InfoItem = {
  title: string;
  subtitle: string;
  list: string[];
};

export const ArAi: FC = () => {
  const [searchParams] = useSearchParams();

  const connection = searchParams.get('connection') || '';
  const connectionType = useMemo(() => resolveConnectionType(connection), [connection]);

  const { containerRef } = useAR(connectionType);
  // const { runOnce,runContinuous,load,loading} =  useAI(connectionType);
  const [status, setStatus] = useState<Status>('ardetect');

  const InfoList: { FRONT: InfoItem; BACK: InfoItem } = {
    FRONT: {
      title: 'Namiřte na přední stranu modemu.',
      subtitle: 'Kontrolky znamenají toto:',
      list: ['Napájení', 'DSL', 'Internet', 'Lan 1-4', 'Wi-Fi 2.5 Ghz', 'Wi-Fi 5Ghz'],
    },
    BACK: {
      title: 'Namiřte na zadní stranu modemu.',
      subtitle: 'Jednotlivé části znamenají toto:',
      list: ['On/Off', 'Reset', 'Power', 'USB', 'LAN', 'WAN', 'DSL', 'WIFI ON/OFF', 'WPS', 'Info', 'Zavěšení'],
    },
  };
  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status={status} />
      </Box>
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />

      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

/*
AR
0.ar starts loading... 
<h1>Co je potřeba na instalaci modemu?</h1>
      <Box>
        <p>Položte si modem na prázdný tmavý stůl tak, abyste viděli v dolní části na konektory.</p>
        <p>Připravte si kabel pro propojení zásuvky k modemu.</p>
        <p>Mějte po ruce také zdrojový kabel pro připojení modemu do elektřiny.</p>
      </Box>
  1.ar back target
   AR info zezadu modemu || InfoModal
  <IndicatorInfoList {...InfoList['BACK']} />
  2.ar show cable anim in location based on
   ConnectionType || Modal zapojeni <- ConnectionType
  3.ar show power cable anim in its location 
  Power || Modal zapojeni <- ConnectionType
--> next (pause ai)
AI
check if connection is correct
if not check two more times if not say whats wrong or continue
  AI kontrola zezadu 3x bad -> AR

AR
->ar unpause
  AR zepredu
   || co je co (indikatory) if(i pressedDown) -> Modal z docu
  <IndicatorInfoList {...InfoList['FRONT']} />

AI
check indicators  
AI kontrola zepredu 3x bad -> Fin

Fin


*/
