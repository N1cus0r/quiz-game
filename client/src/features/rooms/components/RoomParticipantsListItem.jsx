import React from "react";
import { Box, colors } from "@mui/material";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const RoomParticipantsListItem = ({ participant, room }) => {
  const { user } = useAuth();

  return (
    <Grid item>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor:
                  participant.user.id === user.user_id
                    ? colors.lightGreen[900]
                    : colors.lightGreen[500],
              }}
            >
              {participant.user.username[0]}
            </Avatar>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">{participant.user.username}</Typography>
              {participant.user.id === room.host_id && (
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  &nbsp;(host)
                </Typography>
              )}
            </Box>
          </Stack>
        </Grid>
        <Grid item>
          <Typography variant="h6" mr={4}>
            {participant.score}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoomParticipantsListItem;
