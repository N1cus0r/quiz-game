import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import useGame from "../../../hooks/useGame";

const CreateGameForm = ({ socket, roomId, value, setValue, disabled }) => {
  const { createGame } = useGame();

  const handleSubmit = async () => {
    const game = await createGame(roomId, value);
    socket.current.send(JSON.stringify({ data: game }));
  };

  return (
    <Paper elevation={8} sx={{ borderRadius: 10 }}>
      <Box p={3} maxHeight={400}>
        <FormControl>
          <FormLabel id="game-type-group-label">Chose the game type:</FormLabel>
          <RadioGroup
            name="game-type-group"
            aria-labelledby="game-type-group-label"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <FormControlLabel
              disabled={disabled}
              control={<Radio />}
              label="Guess Capital"
              value="GC"
            />
            <FormControlLabel
              disabled={disabled}
              control={<Radio />}
              label="Guess Flag"
              value="GF"
            />
          </RadioGroup>
          <Button disabled={disabled} onClick={handleSubmit}>
            Start
          </Button>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default CreateGameForm;
