import { SvgIcon } from '@mui/material';
import { Color } from '../core/theme/color';

const InfoIcon = () => (
  <SvgIcon
  sx={{ color: Color.grey, p: 1, borderRadius: '50%', backgroundColor: Color.white }}
   viewBox="0 0 20 20">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.833496 9.99998C0.833496 4.91665 4.91683 0.833313 10.0002 0.833313C15.0835 0.833313 19.1668 4.91665 19.1668 9.99998C19.1668 15.0833 15.0835 19.1666 10.0002 19.1666C4.91683 19.1666 0.833496 15.0833 0.833496 9.99998ZM2.0835 9.99998C2.0835 14.375 5.62516 17.9166 10.0002 17.9166C14.3752 17.9166 17.9168 14.375 17.9168 9.99998C17.9168 5.62498 14.3752 2.08331 10.0002 2.08331C5.62516 2.08331 2.0835 5.62498 2.0835 9.99998ZM10.8335 8.74998V14.1666H9.16683V8.74998H10.8335ZM10.0002 7.49998C10.5755 7.49998 11.0418 7.03361 11.0418 6.45831C11.0418 5.88302 10.5755 5.41665 10.0002 5.41665C9.42487 5.41665 8.9585 5.88302 8.9585 6.45831C8.9585 7.03361 9.42487 7.49998 10.0002 7.49998Z" fill="#262626"/>
  </SvgIcon>
);

export default InfoIcon;