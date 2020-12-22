import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { getPollById, voteForPoll } from "../../apis/poll";
import { UserContext } from "../../contexts/UserContext";
import PollViewSkeleton from "../Skeletons/PollViewSkeleton";
import PollDialog from "../PollDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import FriendVote from "./FriendVote";
import Choice from "./Choice";
import ConfirmationDeleteDialog from "./ConfirmationDeleteDialog";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  backLink: {
    marginBottom: "1.5rem",
    fontSize: "0.875rem",
    textDecorationColor: "#BCCID0",
    color: "#BCC1D0",
    cursor: "pointer",
    "& svg": {
      marginBottom: "-0.2rem",
      height: "1rem",
    },
  },
  editBtnWrapper: {
    position: "absolute",
    top: 0,
    right: "1rem",
    color: "#0000008A",
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
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(
    false
  );
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [pollInfo, setPollInfo] = React.useState({});
  const [vote, setVote] = React.useState(null);
  const { state } = React.useContext(UserContext);
  const { _id: myUserId } = state.user;
  const history = useHistory();

  const fetchPollData = () =>
    getPollById(pollId).then((res) => setPollInfo(res));

  React.useEffect(() => {
    fetchPollData();

    // eslint-disable-next-line
  }, [openEditDialog]);

  if (!pollInfo.length) return <PollViewSkeleton />;

  const {
    question,
    images,
    friendsList,
    numOfVote1,
    numOfVote2,
    userId: askerId,
  } = pollInfo[0];
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
      <span className={classes.backLink} onClick={() => history.goBack()}>
        <BackIcon />
        <span>Back</span>
      </span>

      {askerId === myUserId && (
        <div className={classes.editBtnWrapper}>
          <IconButton onClick={() => setOpenEditDialog(true)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => setOpenDeleteConfirmation(true)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}

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
                data={friend}
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

      <PollDialog
        editMode={true}
        poll={pollInfo[0]}
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
      />

      <ConfirmationDeleteDialog
        pollId={pollId}
        open={openDeleteConfirmation}
        handleClose={() => setOpenDeleteConfirmation(false)}
      />
    </div>
  );
}
