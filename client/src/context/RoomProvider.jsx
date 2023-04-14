import React, { createContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const axiosApi = useAxiosPrivate();

  const checkIfUserInRoom = async () => {
    await axiosApi
      .get("/rooms/check-if-in-room")
      .then((res) => {
        const room = res.data;
        LocalStorageAPI.setLocalStorageRoom(room.code);
        navigate(`/rooms/${room.code}`);
      })
      .catch((e) => {});
  };

  const getRoomData = async (code, setRoom, setLoading) => {
    setLoading(true);
    await axiosApi
      .get("/rooms/", { params: { code } })
      .then((res) => {
        const room = res.data;
        setRoom(room);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const createRoom = async (max_participants, setLoading) => {
    setLoading(true);
    await axiosApi
      .post("/rooms/create-room", { max_participants })
      .then((res) => {
        const room = res.data;
        LocalStorageAPI.setLocalStorageRoom(room.code);
        navigate(`/rooms/${room.code}`);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const joinRoom = async (code, setLoading, setErrorMessage) => {
    setLoading(true);
    await axiosApi
      .put("/rooms/join-room", { code })
      .then((res) => {
        const room = res.data;
        LocalStorageAPI.setLocalStorageRoom(room.code);
        navigate(`/rooms/${room.code}`);
      })
      .catch((e) => {
        if (e.response.data) {
          setErrorMessage("Invalid Code !");
        } else {
          setErrorMessage("Internal Server Error");
        }
      })
      .finally(() => setLoading(false));
  };

  const leaveRoom = async (code) => {
    await axiosApi
      .put("/rooms/leave-room", { code })
      .then(() => {
        LocalStorageAPI.delLocalStorageRoom();
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  const kickUser = async () => {
    navigate("/");
  };

  const code = LocalStorageAPI.getLocalStorageRoom();

  const context = {
    checkIfUserInRoom,
    getRoomData,
    createRoom,
    joinRoom,
    leaveRoom,
    kickUser,
    code,
  };

  return (
    <RoomContext.Provider value={context}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider;
