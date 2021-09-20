import { createTheme } from '@mui/material/styles';
import { grey, indigo, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: grey[100],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
