import React from "react";
import {
  Divider,
  Grid,
  Typography,
  Button,
  Slider,
  Paper,
} from "@mui/material";

const CreateRoomForm = ({
  loading,
  participants,
  setParticipants,
  handleFormSubmit,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <Paper elevation={8} sx={{ borderRadius: 10 }}>
      <Grid container direction="column" spacing={2} p={2}>
        <Grid item>
          <Divider>
            <Typography color="secondary">Create a room</Typography>
          </Divider>
        </Grid>
        <Grid item>
          <Typography color="secondary">
            Select the number of participants
          </Typography>
        </Grid>
        <Grid item>
          <Slider
            disabled={loading}
            valueLabelDisplay="auto"
            defaultValue={2}
            step={1}
            min={2}
            max={5}
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            sx={{ width: 300 }}
          />
        </Grid>
        <Grid item>
          <Button fullWidth disabled={loading} onClick={handleFormSubmit}>
            Create
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateRoomForm;
