//page1
import { StepInfoItem, ModelationArFrontPageProps } from '../../types/modelation';
import { Box, Button } from '@mui/material';
import { useModelationRouter } from '../../hooks/useModelationRouter';
import { StatusBanner } from '../../ui/StatusBanner';
import { Drawer } from '../../ui/Drawer';
import { IndicatorInfoList } from '../../ui/IndicatorInfoList';

export const ModelationArFrontPage = ({ loaded }: ModelationArFrontPageProps) => {
  const { redirectToStep, redirectToPage } = useModelationRouter();

  const indicatorInfoList: StepInfoItem = {
    title: 'Namiřte na přední stranu modemu.',
    subtitle: 'Kontrolky znamenají toto:',
    list: ['Napájení', 'DSL', 'Internet', 'Lan 1-4', 'Wi-Fi 2.5 Ghz', 'Wi-Fi 5Ghz'],
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <StatusBanner status="ardetect" />
      </Box>
      <Drawer open={true}>
        <Box sx={{ my: 0 }}>
          <IndicatorInfoList {...indicatorInfoList} />
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ width: '40%', pr: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => redirectToPage('connection-info')} disabled={!loaded}>
                Zpět
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Button variant="contained" fullWidth onClick={() => redirectToStep('arBack')}>
                Pokračovat
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
