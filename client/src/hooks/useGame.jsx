import { useContext } from "react";
import { GameContext } from "../context/GameProvider";

const useGame = () => {
  return useContext(GameContext);
};

export default useGame;
