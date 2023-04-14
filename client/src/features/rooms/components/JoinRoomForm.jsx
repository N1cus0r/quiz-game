import React from "react";
import {
  Divider,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";

const JoinRoomForm = ({
  code,
  setCode,
  loading,
  errorMessage,
  setErrorMessage,
  handleFormSubmit,
}) => {
  const handleInputChange = (e, setValue) => {
    if (errorMessage) setErrorMessage("");
    setValue(e.target.value.toUpperCase());
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: 10 }}>
      <Grid container direction="column" spacing={2} p={2}>
        {errorMessage && (
          <Grid item>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}
        <Grid item>
          <Divider>
            <Typography color="secondary">Join a room</Typography>
          </Divider>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            disabled={loading}
            value={code}
            onChange={(e) => handleInputChange(e, setCode)}
            type="email"
            label="Code"
            variant="filled"
            helperText="Make sure you enter the correct code"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AbcIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button fullWidth onClick={handleFormSubmit} disabled={loading}>
            Join
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JoinRoomForm;
