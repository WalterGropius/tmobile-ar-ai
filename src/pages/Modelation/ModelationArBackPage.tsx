import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { StepInfoItem } from '../../types/modelation';
import { Box, Button } from '@mui/material';
import { Drawer } from '../../ui/Drawer';
import { IndicatorInfoList } from '../../ui/IndicatorInfoList';

export const ModelationArBackPage = () => {
  const { redirectToStep } = useModelationRouter();

  const indicatorInfoList: StepInfoItem = {
    title: 'Namiřte na zadní stranu modemu.',
    subtitle: 'Jednotlivé části znamenají toto:',
    list: ['On/Off', 'Reset', 'Power', 'USB', 'LAN', 'WAN', 'DSL', 'WIFI ON/OFF', 'WPS', 'Info', 'Zavěšení'],
  };

  const handleExecute = () => {
   console.log('execute');
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
     
      <Drawer open={true}>
        <Box sx={{ my: 2 }}>
       
          <IndicatorInfoList {...indicatorInfoList} />
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToStep('start')}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('cableAnim')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
