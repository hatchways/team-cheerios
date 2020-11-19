import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Choice from "../PollView/Choice";

const baseHalf = {
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  width: "80%",
  height: "50%",
  textAlign: "center",
};

const useStyles = makeStyles(() => ({
  root: {
    marginRight: "1.25rem",
    background: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(221, 224, 233, 0.5)",
    width: 340,
    height: 340,
    textDecoration: "none",
  },
  topHalf: {
    ...baseHalf,
    flexDirection: "column",
  },
  bottomHalf: {
    ...baseHalf,
    paddingTop: "0.5rem",
  },
  title: {
    textTransform: "capitalize",
  },
}));

export default function PollCard({ ...data }) {
  const classes = useStyles();
  const { question, images, numOfVotes } = data;
  const totalVotes = numOfVotes.reduce((a, b) => a + b, 0);

  return (
    <div className={classes.root}>
      <div className={classes.topHalf}>
        <Typography variant="h5" component="h3" className={classes.title}>
          {question}
        </Typography>

        <Typography variant="body1" component="p" color="textSecondary">
          {totalVotes} answers
        </Typography>
      </div>

      <div className={classes.bottomHalf}>
        {images.map((image, i) => (
          <Choice image={image} vote={numOfVotes[i]} key={`choice-${i}`} />
        ))}
      </div>
    </div>
  );
}
