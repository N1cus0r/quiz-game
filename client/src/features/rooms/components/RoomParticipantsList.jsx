import { Box, Paper } from "@mui/material";
import { Divider, Grid } from "@mui/material";
import React from "react";
import RoomParticipantsListItem from "./RoomParticipantsListItem";

const RoomParticipantsList = ({ room }) => {
  return (
    <Paper elevation={8} sx={{ borderRadius: 10 }}>
      <Box p={2} maxHeight={400}>
        <Grid container direction="column" spacing={2} width={450}>
          {room.participants.map((participant, index) => (
            <Grid item key={participant.user.email}>
              <Grid container direction="column" spacing={1}>
                <RoomParticipantsListItem
                  participant={participant}
                  room={room}
                />
                {room.participants.length - 1 !== index && (
                  <Grid item>
                    <Divider flexItem variant="middle" />
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default RoomParticipantsList;
