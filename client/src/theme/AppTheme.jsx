import { ThemeProvider } from "@emotion/react";
import { createTheme, colors, CssBaseline, useMediaQuery } from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const ColorModeContext = createContext();

const AppTheme = ({ children }) => {
  const [mode, setMode] = useState(
    LocalStorageAPI.getLocalStorageTheme() || "light"
  );

  const changeColorMode = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === "light" ? "dark" : "light";
      LocalStorageAPI.setLocalStorageTheme(nextMode);
      return nextMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: colors.lightGreen[700],
          },
          secondary: {
            main: colors.grey[500],
          },
          black: {
            main: colors.grey[900],
          },
          white: {
            main: colors.grey[200],
          },
          blue: {
            main: colors.lightBlue[800],
          },
        },
      }),
    [mode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ColorModeContext.Provider value={{ mode, changeColorMode, isMobile }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppTheme;
