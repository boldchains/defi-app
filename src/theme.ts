import { createTheme, ThemeOptions } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

export const lightThemeOption: ThemeOptions = {
  palette: {
    primary: {
      main: indigo[900],
    },
  },
};

export const lightTheme = createTheme(lightThemeOption);
