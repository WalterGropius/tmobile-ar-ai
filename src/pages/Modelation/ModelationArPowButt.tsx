//done
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { StepInfoItem } from '../../types/modelation';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { IndicatorInfoList } from '../../ui/IndicatorInfoList';

export const ModelationArPowButtPage = () => {
  const { redirectToStep } = useModelationRouter();

 
  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
     
      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
       
        <Box>Zapnete tlacitkem ON/OFF</Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('aiBackPow')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('aiFront')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
