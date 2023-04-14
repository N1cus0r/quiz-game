import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import RoomInfo from "../features/rooms/components/RoomInfo";
import RoomParticipantsList from "../features/rooms/components/RoomParticipantsList";
import useRoom from "../hooks/useRoom";
import useAuth from "../hooks/useAuth";
import CreateGameForm from "../features/games/components/CreateGameForm";
import { useNavigate, useParams } from "react-router-dom";

const Room = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { user } = useAuth();
  const { getRoomData, kickUser } = useRoom();

  const [room, setRoom] = useState({});
  const [gameType, setGameType] = useState("GC");
  const [loading, setLoading] = useState(true);

  const socket = useRef(null);

  const emitLeaveRoomEvent = async () => {
    await socket.current.send(
      JSON.stringify({
        data: user.user_id === room.host_id ? "host_left" : "user_left",
      })
    );
  };

  useEffect(() => {
    getRoomData(code, setRoom, setLoading);

    const wsURL =
      process.env.REACT_APP_WEBSOCKET_HOST_URL + `/ws/rooms/${code}`;

    socket.current = new WebSocket(wsURL);

    socket.current.onopen = async (e) => {
      console.log("connect");
      await socket.current.send(JSON.stringify({ data: "user_joined" }));
    };

    socket.current.onmessage = async (e) => {
      const eventJson = JSON.parse(e.data);
      if (["user_joined", "user_left"].includes(eventJson.data)) {
        await getRoomData(code, setRoom, setLoading);
      } else if (eventJson.data === "host_left") {
        await kickUser();
      } else {
        const gameId = eventJson.data.id;
        // console.log(gameId);
        navigate(`/games/${gameId}`);
      }
    };

    return () => {
      socket.current.close();
    };
  }, []);

  if (loading) {
    return;
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          direction="column"
          spacing={8}
        >
          <Grid item>
            <RoomInfo
              code={room.code}
              participants={room.participants}
              maxParticipants={room.max_participants}
              emitLeaveRoomEvent={emitLeaveRoomEvent}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              {user.user_id === room.host_id && (
                <Grid item>
                  <CreateGameForm
                    socket={socket}
                    roomId={room.id}
                    value={gameType}
                    setValue={setGameType}
                    disabled={room.participants.length === 1}
                  />
                </Grid>
              )}
              <Grid item>
                <RoomParticipantsList room={room} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Room;
