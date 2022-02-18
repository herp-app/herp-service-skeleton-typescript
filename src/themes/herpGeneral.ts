import { createTheme, Theme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Theme {
      type: "light" | "dark";
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      type?: "light" | "dark";
    }
  }

export default function getTheme(mode: Theme["palette"]["mode"] = "light") {
    return createTheme({
        palette: {
            mode,
        },
        zIndex: {
            appBar: 1200,
            drawer: 1100,
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: "standard",
                }
            },
            MuiSelect: {
                defaultProps: {
                    variant: "standard",
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        "&.MuiTableCell-head": {
                            background: "none",
                            textAlign: "center",
                            borderBottom: "1px solid #000",
                        }
                    }
                }
            }
        }
    });
} 