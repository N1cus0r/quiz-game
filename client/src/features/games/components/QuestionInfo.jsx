import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const QuestionInfo = ({ question }) => {
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Box
          component="img"
          sx={{ height: 270, width: 400 }}
          src={question.image}
        />
      </Grid>
      <Grid item>
        <Typography variant="h5">{question.text}</Typography>
      </Grid>
    </Grid>
  );
};

export default QuestionInfo;
