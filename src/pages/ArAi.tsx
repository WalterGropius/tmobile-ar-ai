import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { Button, Box } from '@mui/material';
import { IndicatorInfoList } from '../ui/IndicatorInfoList';
import { useSearchParams } from 'react-router-dom';
import { StatusBanner } from '../ui/StatusBanner';
import { FC, useMemo } from 'react';
import { Drawer } from '../ui/Drawer';
import { useAR } from '../hooks/useAR';
import { useAI } from '../hooks/useAI';

export const ArAi: FC = () => {
  const [searchParams] = useSearchParams();

  const connection = searchParams.get('connection') || '';
  const connectionType = useMemo(() => resolveConnectionType(connection), [connection]);

  const { containerRef, currentStep, handlePreviousClick, handleNextClick } = useAR(connectionType);
  //const { loading, debugMode, next, modemStatus, videoRef, canvasRef } =  useAI(connectionType); //a co  handleNextClick, handlePreviousClick?

  return (
    <Box>
      <StatusBanner status="ardetect" />
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      {currentStep < 4 && (
        <Drawer open={true}>
          {currentStep === 1 ? (
            <IndicatorInfoList
              title="Namiřte na přední stranu modemu."
              subtitle="Kontrolky znamenají toto:"
              list={['Napájení', 'DSL', 'Internet', 'Lan 1-4', 'Wi-Fi 2.5 Ghz', 'Wi-Fi 5Ghz']}
            />
          ) : null}
          {currentStep === 0 ? (
            <IndicatorInfoList
              title="Namiřte na zadní stranu modemu."
              subtitle="Jednotlivé části znamenají toto:"
              list={['On/Off', 'Reset', 'Power', 'USB', 'LAN', 'WAN', 'DSL', 'WIFI ON/OFF', 'WPS', 'Info', 'Zavěšení']}
            />
          ) : null}
          <Button onClick={handlePreviousClick} variant="outlined">
            Zpět
          </Button>
          <Button onClick={handleNextClick} variant="contained">
            Pokračovat
          </Button>
        </Drawer>
      )}
    </Box>
  );
};
