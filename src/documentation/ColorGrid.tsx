import { formatColorsForDocumentation } from './formatColorsForDocumentation';
import { Box, ButtonBase, Typography } from '@mui/material';
import { getColorLuma } from './getColorLuma';
import { Color } from '../core/theme/color';
import { FC } from 'react';

export const ColorGrid: FC = () => (
  <Box>
    {formatColorsForDocumentation(Object.entries(Color)).map((colorGroup, keyGroup) => (
      <Box key={keyGroup} title={colorGroup.name || 'Default group'}>
        <Box
          sx={{
            display: 'flex',
            padding: '.25em .75em',
            borderTopLeftRadius: '.25rem',
            borderTopRightRadius: '.25rem',
            borderBottom: `1px solid ${Color.black}`,
          }}
        >
          <Box>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{colorGroup.name || 'Default group'}</h2>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', pt: 1 }}>
          {colorGroup.colors.map(({ name, color }, keyColor) => (
            <ButtonBase
              key={keyColor}
              sx={{
                display: 'block',
                mr: 1,
                mb: 1,
                backgroundColor: color,
                textAlign: 'center',
                width: '17em',
                height: '12em',
                padding: 2,
                color: getColorLuma(color) < 128 ? Color.white : Color.black,
                textShadow: getColorLuma(color) < 128 ? `${Color.black} 0 0 0.3em` : 'unset',
                boxShadow: `0 0 .5em #aaa`,
                border: `1px solid ${getColorLuma(color) < 128 ? Color.white : Color.black}`,
                borderRadius: '2px',
              }}
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: '1em', marginBottom: '2em' }}>{name}</Typography>
              <Typography sx={{ fontSize: '12pt', fontFamily: 'monospace' }}>{color}</Typography>
            </ButtonBase>
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);
