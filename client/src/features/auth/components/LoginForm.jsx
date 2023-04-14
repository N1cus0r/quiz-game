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

const LoginForm = ({
  email,
  password,
  errorMessage,
  message,
  loading,
  setLoading,
  setEmail,
  setPassword,
  setErrorMessage,
  handleFormSubmit,
}) => {
  const handleInputChange = (e, setValue) => {
    if (errorMessage) setErrorMessage("");
    setValue(e.target.value);
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
          <Typography color="secondary">Enter your account</Typography>
        </Divider>
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
          helperText="Do not share your password with anyone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={0.5}>
          <Grid item>
            <Button fullWidth onClick={handleFormSubmit} disabled={loading}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
