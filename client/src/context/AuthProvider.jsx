import React, { createContext } from "react";
import useAxios from "../hooks/useAxios";
import jwtDecode from "jwt-decode";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const axiosApi = useAxios();

  const registerUser = async (
    username,
    email,
    password,
    setLoading,
    setErrorMessage,
    setMessage
  ) => {
    setLoading(true);
    await axiosApi
      .post("/auth/register", { username, email, password })
      .then((res) => setMessage("You have registered successfully !"))
      .catch((e) => {
        console.log(e);
        if (e.response.data) {
          setErrorMessage("Username or email already taken !");
        } else {
          setErrorMessage("An error appeared on server side ! ");
        }
      })
      .finally(() => setLoading(false));
  };

  const loginUser = async (email, password, setLoading, setErrorMessage) => {
    setLoading(true);
    await axiosApi
      .post("auth/token", { email, password })
      .then((res) => {
        if (res.status === 200) {
          const tokens = res.data;
          LocalStorageAPI.setLocalStorageTokens(tokens);
          navigate("/");
        }
      })
      .catch((e) => {
        if (e.response.data) {
          setErrorMessage("User account not found or inactive !");
        } else {
          setErrorMessage("An error appeared on server side ! ");
        }
      })
      .finally(() => setLoading(false));
  };

  const logoutUser = () => {
    // IF USER IN ROOM LEAVE ROOM
    LocalStorageAPI.delLocalStorageTokens();
    navigate("/login");
  };

  const tokens = LocalStorageAPI.getLocalStorageTokens();
  const user = tokens ? jwtDecode(tokens?.access) : undefined;

  const context = { registerUser, loginUser, logoutUser, user };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
