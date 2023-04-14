import React from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import useRoom from "../../../hooks/useRoom";

const RoomInfo = ({
  loading,
  code,
  participants,
  emitLeaveRoomEvent,
  maxParticipants,
}) => {
  const { leaveRoom } = useRoom();
  const handleClick = async () => {
    await leaveRoom(code);
    await emitLeaveRoomEvent();
  };
  return (
    <Paper elevation={8} sx={{ borderRadius: 10 }}>
      <Box p={2}>
        <Grid
          container
          direction="column"
          spacing={2}
          display="flex"
          justifyContent="center"
          textAlign="center"
        >
          <Grid item>
            <Stack direction="column">
              <Typography variant="h5">{code}</Typography>
              <Typography variant="body2" color="secondary">
                You share can this code with others
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Divider flexItem variant="middle" />
          </Grid>
          <Grid item>
            <Stack direction="column">
              <Typography variant="h5">
                Participants: {participants.length} / {maxParticipants}
              </Typography>
              <Typography color="secondary" variant="body2">
                This room will be deleted after the host leaves
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Divider flexItem variant="middle" />
          </Grid>
          <Grid item>
            <Button fullWidth onClick={handleClick} disabled={loading}>
              Leave Room
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default RoomInfo;
