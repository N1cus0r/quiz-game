import React, { createContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const axiosApi = useAxiosPrivate();

  const getCurrentQuestion = async (id, setQuestion, setLoading) => {
    setLoading(true);
    await axiosApi
      .get("/quiz/get-game", { params: { id } })
      .then((res) => {
        const question = res.data.current_question.question;
        setQuestion(question);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const createGame = async (room, type) => {
    try {
      const response = await axiosApi.post("/quiz/create-game", { room, type });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const context = {
    createGame,
    getCurrentQuestion,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
