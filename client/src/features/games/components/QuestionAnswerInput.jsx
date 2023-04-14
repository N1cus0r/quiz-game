import React from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const QuestionAnswerInput = ({
  answer,
  setAnswer,
  correctAnswer,
  handleCorrectAnswer,
}) => {
  const checkAnswer = async () => {
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      await handleCorrectAnswer();
    }
    setAnswer("");
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        type="text"
        label="Answer"
        variant="filled"
        // helperText="Whoever gives the correct answer first gets a point !"
        helperText={correctAnswer}
      />
      <IconButton color="primary" onClick={checkAnswer}>
        <SendIcon />
      </IconButton>
    </Stack>
  );
};

export default QuestionAnswerInput;
