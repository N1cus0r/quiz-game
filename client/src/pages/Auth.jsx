import { Box, Grid, LinearProgress, Tab } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { registerUser, loginUser } = useAuth();

  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleFormChange = (e, formType) => {
    setMessage("");
    setErrorMessage("");
    setFormType(formType);
  };

  const handleLoginFormSubmit = async () => {
    await loginUser(email, password, setLoading, setErrorMessage);
  };

  const handleRegisterFormSubmit = async () => {
    await registerUser(
      username,
      email,
      password,
      setLoading,
      setErrorMessage,
      setMessage
    );
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      direction="column"
      spacing={1}
    >
      <Grid item>
        <TabContext value={formType}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleFormChange} variant="fullWidth">
              <Tab label="Login" value="login" />
              <Tab label="Register" value="register" />
            </TabList>
          </Box>
          <TabPanel value="login">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              errorMessage={errorMessage}
              message={message}
              loading={loading}
              setLoading={setLoading}
              setPassword={setPassword}
              setErrorMessage={setErrorMessage}
              handleFormSubmit={handleLoginFormSubmit}
            />
          </TabPanel>
          <TabPanel value="register">
            <RegisterForm
              username={username}
              email={email}
              password={password}
              errorMessage={errorMessage}
              message={message}
              loading={loading}
              setLoading={setLoading}
              setUsername={setUsername}
              setEmail={setEmail}
              setPassword={setPassword}
              setErrorMessage={setErrorMessage}
              handleFormSubmit={handleRegisterFormSubmit}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      {loading && (
        <Grid item sx={{ width: 280 }}>
          <LinearProgress color="primary" />
        </Grid>
      )}
    </Grid>
  );
};

export default Auth;
