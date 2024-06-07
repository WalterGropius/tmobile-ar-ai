import { Box, Typography } from '@mui/material';
import { Color } from '../core/theme/color';
import { FC } from 'react';

type IndicatorInfoListProps = {
  title: string;
  subtitle: string;
  list: string[];
};

export const IndicatorInfoList: FC<IndicatorInfoListProps> = ({ title, subtitle, list }) => {
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

  const getColumns = (list: string[]) => {
    if (list.length > 6) {
      const third = Math.ceil(list.length / 3);
      return [
        renderList(list.slice(0, third)),
        renderList(list.slice(third, 2 * third), third),
        renderList(list.slice(2 * third), 2 * third),
      ];
    } else {
      const half = Math.ceil(list.length / 2);
      return [
        renderList(list.slice(0, half)),
        renderList(list.slice(half), half),
      ];
    }
  };

  const columns = getColumns(list);

  return (
    <Box>
      <Typography variant="h6" sx={{ color: Color.black }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: Color.black }}>
        {subtitle}
      </Typography>
      <Box sx={{ display: 'flex', mt: 1 }}>
        {columns.map((column, index) => (
          <Box sx={{ mr: index < columns.length - 1 ? 2 : 0 }} key={index}>
            {column}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
