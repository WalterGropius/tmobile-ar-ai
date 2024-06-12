import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { Button, Box } from '@mui/material';
import { IndicatorInfoList } from '../ui/IndicatorInfoList';
import { useSearchParams } from 'react-router-dom';
import { StatusBanner } from '../ui/StatusBanner';
import { FC, useMemo } from 'react';
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
 // const { runOnce,process,loading, debugMode, modemStatus, videoRef, canvasRef } =  useAI(connectionType); 


const InfoList: { FRONT: InfoItem; BACK: InfoItem } = {
  FRONT: {
    title: "Namiřte na přední stranu modemu.",
    subtitle: "Kontrolky znamenají toto:",
    list: ['Napájení', 'DSL', 'Internet', 'Lan 1-4', 'Wi-Fi 2.5 Ghz', 'Wi-Fi 5Ghz']
  },
  BACK: {
    title: "Namiřte na zadní stranu modemu.",
    subtitle: "Jednotlivé části znamenají toto:",
    list: [
      'On/Off', 'Reset', 'Power', 'USB', 'LAN', 'WAN', 'DSL', 'WIFI ON/OFF', 'WPS', 'Info', 'Zavěšení'
    ]
  }
};
  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
    
        <Drawer open={true}>
          <Box sx={{ my: 2 }}>
              <IndicatorInfoList {...InfoList['BACK']}/>
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
  1. AR info zezadu modemu || InfoModal
  2. ConnectionType || Modal zapojeni <- ConnectionType
  3. Power || Modal zapojeni <- ConnectionType

AI
  AI kontrola zezadu 3x bad -> AR

AR
  AR zepredu || co je co (indikatory) if(i pressedDown) -> Modal z docu

AI
  AI kontrola zepredu 3x bad -> Fin

Fin


*/