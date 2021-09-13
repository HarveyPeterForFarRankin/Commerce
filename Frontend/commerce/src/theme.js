import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#72A8A1',
    },
    secondary: {
      main: '#993428',
    },
    info: {
      main: '#7F7F7F',
      light: '#ECECEC',
    },
  },
  spacing: 8,
});

export default theme;
