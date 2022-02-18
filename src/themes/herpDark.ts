import { createTheme, Theme } from '@mui/material/styles';
import herpGeneralTheme from "./herpGeneral";

const themeGeneral = herpGeneralTheme("dark");

const colors: Theme = createTheme(themeGeneral, {
    palette: {
          primary: {
              main: "#73BBDC",
          },
          secondary: {
              main: "#328dc5",
          },
          background: {
              paper: "#2B2A33",
              default: "#1C1B22",
          },
          mode: 'dark',
      }, 
  });
  
  const herpDark: Theme = createTheme(colors, {
  
  });

  export default herpDark;