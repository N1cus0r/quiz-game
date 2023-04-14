import { useContext } from "react";
import { ColorModeContext } from "../theme/AppTheme";

const useTheme = () => {
  const { mode, changeColorMode, isMobile } = useContext(ColorModeContext);
  return { mode, changeColorMode, isMobile };
};

export default useTheme;
