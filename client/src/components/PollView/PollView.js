import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BackIcon from "@material-ui/icons/ArrowBackIos";

import { polls as initData } from "../../initData";
import ConfirmationDialog from "./ConfirmationDialog";
import FriendPoll from "./FriendPoll";
import Choice from "./Choice";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  backLink: {
    marginBottom: "1.5rem",
    fontSize: "0.875rem",
    textDecorationColor: "#BCCID0",
    color: "#BCC1D0",
    "& a": {
      display: "flex",
      alignItems: "center",
    },
    "& a:visited": {
      color: "#BCC1D0",
      textDecorationColor: "#BCC1D0",
    },
    "& svg": {
      height: "1rem",
    },
  },
  answers: {
    marginBottom: "1.5rem",
    fontSize: "1rem",
    color: "#BCC1D0",
  },
  choiceWrapper: {
    display: "flex",
    marginBottom: "2rem",
  },
  friendPollWrapper: {
    overflow: "scroll",
  },
}));

export default function PollView({ id }) {
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [vote, setVote] = React.useState(null);

  // TODO: Fetch Poll Data
  const { question, images, friendsList, numOfVotes } = initData[id];
  React.useEffect(() => {
    console.log(`fetch poll data id:${id}`);
  }, [id]);

  const totalVotes = numOfVotes.reduce((a, b) => a + b, 0);

  const handleClick = (choice) => {
    setVote(choice);
    // TODO: Check user already voted or not
    const alreadyVoted = true;
    if (alreadyVoted) {
      setOpenConfirmation(true);
    } else {
      voteChoice(choice);
    }
  };

  const voteChoice = (choice) => {
    // TODO: api call
    console.log("send request to vote your choice", choice);
  };

  return (
    <div className={classes.root}>
      <span className={classes.backLink}>
        <Link to="/dashboard">
          <BackIcon />
          <span>Back</span>
        </Link>
      </span>

      <Typography variant="h4" component="h2">
        {question}
      </Typography>

      <span className={classes.answers}>{totalVotes} answers</span>

      <div className={classes.choiceWrapper}>
        {images.map((image, i) => (
          <Choice
            image={image}
            vote={numOfVotes[i]}
            onClick={() => handleClick(i)}
            key={`choice-${i}`}
          />
        ))}
      </div>

      <div className={classes.friendPollWrapper}>
        {friendsList.user.map((friend, i) => (
          <FriendPoll {...friend} images={images} key={`friend-poll-${i}`} />
        ))}
      </div>

      <ConfirmationDialog
        vote={vote}
        open={openConfirmation}
        handleClose={() => setOpenConfirmation(false)}
        voteChoice={voteChoice}
      />
    </div>
  );
}
