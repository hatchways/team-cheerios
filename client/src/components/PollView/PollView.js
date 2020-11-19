import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import HeartIcon from "@material-ui/icons/Favorite";

import Img1 from "../../assets/black-T.png";
import Img2 from "../../assets/white-T.png";
import FriendPoll from "./FriendPoll";
import ConfirmationDialog from "./ConfirmationDialog";

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
  question: {
    fontWeight: 600,
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
  choice: {
    display: "flex",
    flexDirection: "column",
    marginRight: "0.5rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textAlign: "center",
    cursor: "pointer",
  },
  image: {
    marginBottom: "0.75rem",
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > svg": {
      width: "1rem",
      height: "0.875rem",
      color: "#FF5D5D",
    },
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
  const { question, images, friendsList, numOfVotes } = initData;
  React.useEffect(() => {
    console.log(`fetch poll data id:${id}`);
  }, []);

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

      <Typography variant="h4" component="h2" className={classes.question}>
        {question}
      </Typography>

      <span className={classes.answers}>{totalVotes} answers</span>

      <div className={classes.choiceWrapper}>
        {images.map((image, i) => (
          <div
            key={`choice-${i}`}
            className={classes.choice}
            onClick={() => handleClick(i)}
          >
            <img src={image} alt="choice" className={classes.image} />
            <span className={classes.likes}>
              <HeartIcon />
              {numOfVotes[i]}
            </span>
          </div>
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

// Temp data
const initData = {
  question: "Which one is better?",
  images: [Img1, Img2],
  friendsList: {
    title: "clothes",
    user: [
      {
        name: "Mary Shealye",
        image: "",
        vote: "a",
        votedAt: "2020-11-17T19:00:11.536+00:00",
      },
      {
        name: "Kimberly Martin",
        image: "",
        vote: "a",
        votedAt: "2020-11-17T01:58:11.536+00:00",
      },
      {
        name: "Louisa Holbrook",
        image: "",
        vote: "b",
        votedAt: "2020-11-16T01:58:11.536+00:00",
      },
      {
        name: "Lucy Berger",
        image: "",
        vote: "a",
        votedAt: "2020-11-15T01:58:11.536+00:00",
      },
      {
        name: "Florence Lantz",
        image: "",
        vote: "b",
        votedAt: "2020-11-14T01:58:11.536+00:00",
      },
    ],
  },
  numOfVotes: [18, 6],
};
