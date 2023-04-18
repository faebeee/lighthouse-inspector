import { createTheme } from '@mui/material';
import { THEME } from '../config.web';

export const theme = createTheme({
  palette: {
    mode: THEME.mode,
    primary: {
      main: THEME.primary
    },
    secondary: {
      main: THEME.secondary
    }
  },
  components: {
    // MuiPaper: {
    //     styleOverrides: {
    //         root: {
    //             background: THEME.cardBackground,
    //             backdropFilter: 'blur( 5.5px )',
    //         }
    //     }
    // }
  }
});
