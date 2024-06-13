import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { FC } from 'react';
import labels from "../../utils/labels.json";

type Props = {
  detections: unknown;
  handleExecute: () => void;
};

export const ModelationAiFrontPage: FC<Props> = ({ detections, handleExecute }) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="aicontrol" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
          <h1>Zapojení AI</h1>
          <h4>Výsledný stav (proces může trvat až 2 minuty)</h4>
          <button onClick={() => handleExecute()}>Execute</button>
         {detections && detections.map((detection, index) => (
                <li key={index}>
                  Box: {detection[0].toFixed(2)}, {detection[1].toFixed(2)},{" "}
                  {detection[2].toFixed(2)}, {detection[3].toFixed(2)}
                  <br />
                  Score: {detection[4].toFixed(2)}
                  <br />
                  Class: {labels[detection[5]]}
                </li>
              ))}
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('arFront')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToPage('fin')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
