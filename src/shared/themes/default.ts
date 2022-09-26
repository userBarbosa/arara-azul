/* eslint-disable linebreak-style */
import { createTheme } from '@mui/material';

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: '#00335C',
      dark: '#144871',
      light: '#006BBF',
      contrastText: '#F7F9FC',
    },
    background: {
      default: '#F7F9FC',
      paper: '#ffffff'
    }
  }
});