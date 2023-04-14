import React from "react";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { logoutUser, user } = useAuth();
  const { mode, changeColorMode } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          edge="start"
          onClick={() => navigate("/")}
        >
          <PublicIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
          onClick={() => navigate("/")}
        >
          County Quiz
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          <Tooltip
            title={
              mode === "light" ? "Turn off the light" : "Turn on the light"
            }
          >
            <IconButton
              size="large"
              color="inherit"
              edge="start"
              onClick={changeColorMode}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          {user && (
            <Typography
              variant="body2"
              noWrap
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontFamily: "monospace",
              }}
              onClick={async () => await logoutUser()}
            >
              Logout
            </Typography>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
