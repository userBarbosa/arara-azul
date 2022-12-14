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
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#144871',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#144871',
          },
          '&:hover': {
            backgroundColor: '#006BBF',
          },
          '& .MuiTypography-root': {
            fontFamily: '\'Poppins\', sans-serif',
            fontWeight: '600',
          },
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#144871',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#144871',
          },
          '&:hover': {
            backgroundColor: '#006BBF',
          },
          '& .MuiTypography-root': {
            fontFamily: '\'Poppins\', sans-serif',
            fontWeight: '600',
          },
        },
      }
    }
  },
  typography: {
    fontFamily: '\'Poppins\', sans-serif',
  }
});