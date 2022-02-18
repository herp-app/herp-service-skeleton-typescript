import { createTheme, Theme } from '@mui/material/styles';
import herpGeneralTheme from "./herpGeneral";

const themeGeneral = herpGeneralTheme("light");

const colors: Theme = createTheme(themeGeneral, {
    palette: {
        primary: {
          main: "#73BBDC",
        },
        secondary: {
          main: "#328dc5",
        },
        background: {
            paper: "#F6F9FB",
        },
        mode: 'light',
    },
  });

const herpLight: Theme = createTheme(colors, {
    // components: {
    //     MuiTableCell: {
    //         styleOverrides: {
    //             root: {
    //                 "&.MuiTableCell-head": {
    //                     backgroundColor: colors.palette.background.paper,
    //                 }
    //             }
    //         }
    //     }
    // }
});

export default herpLight;