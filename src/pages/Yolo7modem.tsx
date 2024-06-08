import { resolveConnectionType } from '../core/connection/resolveConnectionType';
import { useSearchParams } from 'react-router-dom';
import { HeaderTitle } from '../components/HeaderTitle';
import { Box, Button } from '@mui/material';
import { Loader } from '../components/Loader';
import { Drawer } from '../ui/Drawer';
import { useAI } from '../hooks/useAI';

export const Yolo7modem = () => {
  const [searchParams] = useSearchParams();
  const connectionType = resolveConnectionType(searchParams.get('connection') || '');

  const { loading, debugMode, next, modemStatus, videoRef, canvasRef, h2Text, handleNextClick, handlePreviousClick } =
    useAI(connectionType);

  return (
    <Box className="App">
      {loading.loading ? (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      ) : (
        <Box className="content">
          <HeaderTitle>
            <h1>AI kontrola zapojení</h1>
            <h2>{h2Text}</h2>
            <h3>{modemStatus}</h3>
          </HeaderTitle>
          <video autoPlay playsInline muted ref={videoRef} id="frame" />
          <canvas height={640} width={640} ref={canvasRef} style={{ display: debugMode ? 'block' : 'none' }} />
          {!next && (
            <Box className="wrapper">
              <div className="spinner" />
            </Box>
          )}
          <Drawer>
            <Button onClick={handlePreviousClick} variant="outlined">
              Zpět
            </Button>
            {next && (
              <Button onClick={handleNextClick} variant="contained">
                Pokračovat
              </Button>
            )}
          </Drawer>
        </Box>
      )}
    </Box>
  );
};
