import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BackIcon from "@material-ui/icons/ArrowBackIos";

import { getPollById, voteForPoll } from "../../apis/poll";
import { UserContext } from "../../contexts/UserContext";
import PollViewSkeleton from "../Skeletons/PollViewSkeleton";
import ConfirmationDialog from "./ConfirmationDialog";
import FriendVote from "./FriendVote";
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

export default function PollView({ pollId }) {
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [pollInfo, setPollInfo] = React.useState({});
  const [vote, setVote] = React.useState(null);
  const { state } = React.useContext(UserContext);
  const { id: myUserId } = state.user;

  const fetchPollData = () =>
    getPollById(pollId).then((res) => setPollInfo(res));

  React.useEffect(() => {
    fetchPollData();

    // eslint-disable-next-line
  }, []);

  if (!pollInfo.length) return <PollViewSkeleton />;

  const { question, images, friendsList, numOfVote1, numOfVote2 } = pollInfo[0];
  const totalVotes = numOfVote1 + numOfVote2;
  const numOfVotes = [numOfVote1, numOfVote2];

  const canVote = friendsList?.users.some((user) => user._id === myUserId);

  let myVote = null;
  if (canVote) {
    myVote = +friendsList?.users.filter((user) => user._id === myUserId)[0]
      .voteFor;
  }

  const handleClick = async (choice) => {
    setVote(choice);

    if (myVote) {
      setOpenConfirmation(true);
    } else {
      await voteForPoll(pollId, choice).then(() => fetchPollData());
    }
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
            votes={numOfVotes[i]}
            filled={myVote === i + 1}
            key={`choice-${i}`}
            onClick={
              canVote && myVote !== i + 1 ? () => handleClick(i + 1) : undefined
            }
            style={{
              cursor: canVote && myVote !== i + 1 ? "pointer" : "not-allowed",
            }}
          />
        ))}
      </div>

      <div className={classes.friendPollWrapper}>
        {friendsList?.users.map(
          (friend, i) =>
            friend.voteFor && (
              <FriendVote
                {...friend}
                images={images}
                key={`friend-poll-${i}`}
              />
            )
        )}
      </div>

      <ConfirmationDialog
        pollId={pollId}
        vote={vote}
        open={openConfirmation}
        fetchPollData={fetchPollData}
        handleClose={() => setOpenConfirmation(false)}
      />
    </div>
  );
}
