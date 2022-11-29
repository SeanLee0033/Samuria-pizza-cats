import { createTheme } from '@material-ui/core';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'Poppins, sans-serif',
        textTransform: 'none',
      },
    },
  },
});

export { theme };
