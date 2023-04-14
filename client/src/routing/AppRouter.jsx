import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import PrivateRoute from "./PrivateRoute";

import React from "react";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Room from "../pages/Room";
import Game from "../pages/Game";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:code" element={<Room />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/games/:gameId" element={<Game />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
