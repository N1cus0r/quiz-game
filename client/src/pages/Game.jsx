import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import QuestionInfo from "../features/games/components/QuestionInfo";
import QuestionAnswerInput from "../features/games/components/QuestionAnswerInput";
import useAuth from "../hooks/useAuth";
import useGame from "../hooks/useGame";
import useRoom from "../hooks/useRoom";

const Game = () => {
  const navigate = useNavigate();
  const { code } = useRoom();
  const { user } = useAuth();
  const { gameId } = useParams();
  const { getCurrentQuestion } = useGame();

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(false);

  const socket = useRef(null);

  const handleCorrectAnswer = async () => {
    await socket.current.send(
      JSON.stringify({ data: { user_id: user.user_id } })
    );
    console.log("answer sent");
  };

  useEffect(() => {
    getCurrentQuestion(gameId, setQuestion, setLoading);

    const wsURL =
      process.env.REACT_APP_WEBSOCKET_HOST_URL + `/ws/games/${gameId}`;

    socket.current = new WebSocket(wsURL);

    socket.current.onopen = () => {
      console.log("connect");
    };

    socket.current.onmessage = async (e) => {
      const data = JSON.parse(e.data);
      if (data.event === "next_question") {
        await getCurrentQuestion(gameId, setQuestion, setLoading);
      } else {
        navigate(`/rooms/${code}`);
        console.log("GAME OVER");
      }
    };

    return () => {
      socket.current.close();
    };
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={8} sx={{ borderRadius: 10 }}>
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            direction="column"
            spacing={2}
            p={3}
          >
            <Grid item>
              <QuestionInfo question={question} />
            </Grid>
            <Grid item>
              <QuestionAnswerInput
                answer={answer}
                setAnswer={setAnswer}
                correctAnswer={question.answer}
                handleCorrectAnswer={handleCorrectAnswer}
              />
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Game;
