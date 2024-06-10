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

  const { containerRef, step, handlePreviousClick, handleNextClick } = useAR(connectionType);
  //const { loading, debugMode, next, modemStatus, videoRef, canvasRef } =  useAI(connectionType); //a co  handleNextClick, handlePreviousClick?

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      {step < 4 && (
        <Drawer open={true}>
          <Box sx={{ my: 2 }}>
            {step === 1 ? (
              <IndicatorInfoList
                title="Namiřte na přední stranu modemu."
                subtitle="Kontrolky znamenají toto:"
                list={['Napájení', 'DSL', 'Internet', 'Lan 1-4', 'Wi-Fi 2.5 Ghz', 'Wi-Fi 5Ghz']}
              />
            ) : null}
            {step === 0 ? (
              <IndicatorInfoList
                title="Namiřte na zadní stranu modemu."
                subtitle="Jednotlivé části znamenají toto:"
                list={[
                  'On/Off',
                  'Reset',
                  'Power',
                  'USB',
                  'LAN',
                  'WAN',
                  'DSL',
                  'WIFI ON/OFF',
                  'WPS',
                  'Info',
                  'Zavěšení',
                ]}
              />
            ) : null}
            <Box sx={{ display: 'flex', mt: 1 }}>
              <Box sx={{ width: '40%', pr: 1 }}>
                <Button onClick={handlePreviousClick} variant="outlined" fullWidth>
                  Zpět
                </Button>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Button onClick={handleNextClick} variant="contained" fullWidth>
                  Pokračovat
                </Button>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
