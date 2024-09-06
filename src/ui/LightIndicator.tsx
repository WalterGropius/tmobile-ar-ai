import { Circle } from './Circle';
import { Color } from '../core/theme/color';
import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  statusList: boolean[];
};

export const LightIndicator: FC<Props> = ({ statusList }) => {
  //const displayList = statusList.length === 6 ? statusList : Array(6).fill(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '38px' }}>
      {statusList.map((status, key) => (
        <Circle key={key} color={status ? Color.green : Color.black} />
      ))}
    </Box>
  );
};
