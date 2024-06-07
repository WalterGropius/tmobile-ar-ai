import { Box, Typography } from '@mui/material';
import { Color } from '../core/theme/color';
import { FC } from 'react';

type IndicatorInfoListProps = {
  title: string;
  subtitle: string;
  list: string[];
};

export const IndicatorInfoList: FC<IndicatorInfoListProps> = ({ title, subtitle, list }) => {
  const half = Math.ceil(list.length / 2);

  const renderList = (items: string[], increment = 0) => (
    <>
      {items.map((item, index) => (
        <Box sx={{ display: 'flex', mb: 1 }} key={index}>
          <Box style={{ color: Color.magenta }}>{index + increment + 1}.&nbsp;</Box>
          <Box style={{ color: Color.black }}>{item}</Box>
        </Box>
      ))}
    </>
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ color: Color.black }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: Color.black }}>
        {subtitle}
      </Typography>
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Box sx={{ mr: 2 }}>{renderList(list.slice(0, half))}</Box>
        <Box>{renderList(list.slice(half), half)}</Box>
      </Box>
    </Box>
  );
};
