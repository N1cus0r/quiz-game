import React from "react";
import {
  Alert,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import { Mail } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const RegisterForm = ({
  username,
  email,
  password,
  errorMessage,
  message,
  loading,
  setUsername,
  setEmail,
  setPassword,
  setErrorMessage,
  setLoading,
  handleFormSubmit,
}) => {
  const handleInputChange = (e, setField) => {
    if (errorMessage) setErrorMessage("");
    setField(e.target.value);
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item textAlign="center">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Grid>
      {message && (
        <Grid item>
          <Alert severity="info">{message}</Alert>
        </Grid>
      )}
      <Grid item>
        <Divider>
          <Typography color="secondary">Create your account</Typography>
        </Divider>
      </Grid>
      <Grid item>
        <TextField
          disabled={loading}
          value={username}
          onChange={(e) => handleInputChange(e, setUsername)}
          type="text"
          label="Username"
          variant="filled"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled={loading}
          value={email}
          onChange={(e) => handleInputChange(e, setEmail)}
          type="email"
          label="Email"
          variant="filled"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled={loading}
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          type="password"
          label="Password"
          variant="filled"
          fullWidth
          helperText="Do not share your password with anyone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item container direction="column" spacing={0.5}>
        <Grid item>
          <Button fullWidth onClick={handleFormSubmit} disabled={loading}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
