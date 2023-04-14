import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
