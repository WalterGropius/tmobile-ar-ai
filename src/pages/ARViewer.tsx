import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { Button, Box, Drawer } from '@mui/material';
import { IndicatorInfoList } from '../ui/IndicatorInfoList';
import { useSearchParams } from 'react-router-dom';
import { StatusBanner } from '../ui/StatusBanner';
import { Footer } from '../components/Footer';
import { useAR } from '../hooks/useAR';
import { FC } from 'react';

export const ARViewer: FC = () => {
  const [searchParams] = useSearchParams();
  const connectionType = resolveConnectionType(searchParams.get('connection') || '');

  const { containerRef, currentStep, handlePreviousClick, handleNextClick } = useAR(connectionType);

  return (
    <Box>
      <StatusBanner status="ardetect" />
      <Box ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      {currentStep < 4 && (
        <Footer>
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
                title="Namiřte na přední stranu modemu."
                subtitle="Kontrolky znamenají toto:"
                list={[
                  'Napájení',
                  'DSL',
                  'Internet',
                  'Lan 1-4',
                  'Wi-Fi 2.5 Ghz',
                  'Wi-Fi 5Ghz',
                  'Internet',
                  'Lan 1-4',
                  'Wi-Fi 2.5 Ghz',
                  'Wi-Fi 5Ghz',
                ]}
              />
            ) : null}
            <Button onClick={handlePreviousClick} variant="outlined">
              Zpět
            </Button>
            <Button onClick={handleNextClick} variant="contained">
              Pokračovat
            </Button>
          </Drawer>
        </Footer>
      )}
    </Box>
  );
};
