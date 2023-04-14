import React, { useState, useEffect } from "react";
import { Box, Grid, LinearProgress } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateRoomForm from "../features/rooms/components/CreateRoomForm";
import JoinRoomForm from "../features/rooms/components/JoinRoomForm";
import useRoom from "../hooks/useRoom";

const Home = () => {
  const [formType, setFormType] = useState("join");
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [participants, setParticipants] = useState(2);
  const [errorMessage, setErrorMessage] = useState("");

  const { checkIfUserInRoom, createRoom, joinRoom } = useRoom();

  const handleFormChange = (e, formType) => {
    if (errorMessage) setErrorMessage("");
    setFormType(formType);
  };

  const handleCreateFormSubmit = async () => {
    await createRoom(participants, setLoading);
  };

  const handleJoinFormSubmit = async () => {
    await joinRoom(roomCode, setLoading, setErrorMessage);
  };

  useEffect(() => {
    const redirectIfUserInRoom = async () => {
      await checkIfUserInRoom();
    };

    redirectIfUserInRoom();
  }, []);

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
              <Tab label="Join" value="join" />
              <Tab label="Create" value="create" />
            </TabList>
          </Box>
          <TabPanel value="join">
            <JoinRoomForm
              code={roomCode}
              loading={loading}
              setCode={setRoomCode}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              handleFormSubmit={handleJoinFormSubmit}
            />
          </TabPanel>
          <TabPanel value="create">
            <CreateRoomForm
              loading={loading}
              participants={participants}
              setParticipants={setParticipants}
              handleFormSubmit={handleCreateFormSubmit}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid item>
        {loading && (
          <Grid item sx={{ width: 280 }}>
            <LinearProgress color="primary" />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
