import React from "react";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const tokens = LocalStorageAPI.getLocalStorageTokens();

  return tokens ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
