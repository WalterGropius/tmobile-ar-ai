import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { Button, Box } from '@mui/material';
import { IndicatorInfoList } from '../ui/IndicatorInfoList';
import { useSearchParams } from 'react-router-dom';
import { StatusBanner } from '../ui/StatusBanner';
import type { Status } from '../ui/StatusBanner';
import { useEffect } from 'react';
import { FC, useMemo, useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { useAR } from '../hooks/useAR';
import { useAI } from '../hooks/useAI';

type InfoItem = {
  title: string;
  subtitle: string;
  list: string[];
};
type steps = 'start' | 'back' | 'cableanim' | 'poweranim' | 'aiback' | 'arfront' | 'aifront' | 'finish';

export const ArAi: FC = () => {
  const [searchParams] = useSearchParams();

  const connection = searchParams.get('connection') || '';
  const connectionType = useMemo(() => resolveConnectionType(connection), [connection]);

  const { toggleAR, containerRef } = useAR(connectionType);
  const { videoRef, detections, detectFrame, loading } = useAI(connectionType);
  const [status, setStatus] = useState<Status>('ardetect');
  const [step, setStep] = useState<steps>('start');

  useEffect(() => {
    console.log(`AI loading state: ${loading}`);
  }, [loading]);

  const drawerContents = {
    start: (
      <>
        <h1>Co je potřeba na instalaci modemu?</h1>
        <Box>
          <p>Položte si modem na prázdný tmavý stůl tak, abyste viděli v dolní části na konektory.</p>
          <p>Připravte si kabel pro propojení zásuvky k modemu.</p>
          <p>Mějte po ruce také zdrojový kabel pro připojení modemu do elektřiny.</p>
        </Box>
      </>
    ),
    next: (
      <>
        <h1>dalsi screen</h1>
        <Box>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </Box>
      </>
    ),
  };

  const notifications = {
    FLIP: 'Otočte modem na DRUHOU stranu.',
    POW: 'Zapněte modem(je vypnutý)',
    INCOMP: 'Na tomto zařízení není podpora AR(rozšířené realita)',
    AI: 'Chyba AI analýzy',
  };

  const connectionInstructions = {
    DSL: 'Do vyznačené zdířky zapojte telefonní kabel (ten s užším konektorem)',
    WAN: 'Do vyznačené zdířky zapojte LAN kabel (ten se širším konektorem)',
    POW: 'Do vyznačené zdířky zapojte kabel od napájecího zdroje',
  };

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

  const handleCaptureAndDetect = () => {
    console.log('capture and detect');
    toggleAR();
    detectFrame();
  };

  const handleNext = () => {
    const stepTransitions: Record<steps, steps | (() => void)> = {
      start: 'back',
      back: 'cableanim',
      cableanim: 'poweranim',
      poweranim: 'aiback',
      aiback: 'arfront',
      arfront: 'aifront',
      aifront: 'finish',
      finish: () => {
        window.location.href = '/#/Fin';
      },
    };

    const nextStep = stepTransitions[step];
    if (typeof nextStep === 'function') {
      nextStep();
    } else if (nextStep) {
      setStep(nextStep);
    } else {
      console.error('Unknown step:', step);
    }
  };

  const handleBack = () => {
    const stepTransitions: Record<steps, steps | (() => void)> = {
      finish: 'aifront',
      aifront: 'arfront',
      arfront: 'aiback',
      aiback: 'poweranim',
      poweranim: 'cableanim',
      cableanim: 'back',
      back: 'start',
      start: () => {
        window.location.href = '/#/connection-type';
      },
    };

    const prevStep = stepTransitions[step];
    if (typeof prevStep === 'function') {
      prevStep();
    } else if (prevStep) {
      setStep(prevStep);
    } else {
      console.error('Unknown step:', step);
    }
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status={status} />
      </Box>
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      <video ref={videoRef} autoPlay playsInline />
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          <Button variant="contained" fullWidth onClick={handleCaptureAndDetect}>
            Debug Button
          </Button>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={handleBack}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={handleNext}>
                Pokračovat
              </Button>
              <Box>{step}</Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

/*



















type steps = 'start' | 'back' | 'cableanim' | 'poweranim' | 'aiback' | 'arfront' | 'aifront' | 'finish';





AR

0.ar starts loading... 
step = start
drawercontents(start)

1.ar back target
step = back
drawercontents(back, <IndicatorInfoList {...InfoList['BACK']} />)
   AR info zezadu modemu 
   InfoModal
 
2. step = cableanim
drawercontents(cableanim)
ar show cable anim in location based on ConnectionType 
   Modal zapojeni <- ConnectionType

3.ar show power cable anim in its location 
step = poweranim
drawercontents(poweranim)
  Power || Modal zapojeni <- ConnectionType
--> next (pause ar)

AI

4.
step = aiback
drawercontents(aiback)
check if connection is correct
if not check two more times if not say whats wrong or continue
  AI kontrola zezadu 3x bad -> AR

5.AR
step = arfront
drawercontents(arfront,<IndicatorInfoList {...InfoList['FRONT']} />)
->ar unpause
  AR zepredu
   || co je co (indikatory) if(i pressedDown) -> Modal z docu
  

6.AI
step = aifront
drawercontents(aifront)
execute model 3 times 
check indicators  
AI kontrola zepredu 3x bad -> FinBad
AI kontrola zepredu  good -> Fin

FinBad
drawercontents(finbad)
Bohuzel to nejde
zkusit znovu
zavolat podporu


*/
