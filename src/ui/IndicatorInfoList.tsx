import { Color } from '../core/theme/color';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { FC } from 'react';

type IndicatorInfoListProps = {
  title: string;
  subtitle: string;
  list: string[];
};

export const IndicatorInfoList: FC<IndicatorInfoListProps> = ({ title, subtitle, list }) => {
  const half = Math.ceil(list.length / 2);
  const firstHalf = list.slice(0, half);
  const secondHalf = list.slice(half);

  const formatListItemText = (index: number, item: string) => (
    <>
      <span style={{ color: Color.magenta }}>{index + 1}. </span>
      <span style={{ color: Color.black }}>{item}</span>
    </>
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ color: Color.black }}>{title}</Typography>
      <Typography variant="subtitle1" sx={{ color: Color.black }}>{subtitle}</Typography>
      <Box sx={{ display: 'flex' }}>
        <List>
          {firstHalf.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={formatListItemText(index, item)} />
            </ListItem>
          ))}
        </List>
        <List>
          {secondHalf.map((item, index) => (
            <ListItem key={index + half}>
              <ListItemText primary={formatListItemText(index + half, item)} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
