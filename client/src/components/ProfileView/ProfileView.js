import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PollDialog from "../PollDialog/PollDialog";
import FriendsListDialog from "../FriendsListDialog";
import OutlinedBtn from "../OutlinedBtn";
import FriendsListCard from "./FriendsListCard";
import PollCard from "./PollCard";

const useStyles = makeStyles(() => ({
  article: {
    margin: "0 auto 3rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    flexGrow: 1,
    "& span": {
      fontSize: "1.25rem",
      color: "#0000008A",
    },
  },
  cards: {
    display: "flex",
    "& a": {
      textDecoration: "none",
    },
    "& a:visited": {
      color: "inherit",
      textDecorationColor: "inherit",
    },
    overflowX: "scroll",
    overflowY: "hidden",
  },
}));

export default function ProfileView() {
  const classes = useStyles();
  const [openFriendDialog, setOpenFriendDialog] = React.useState(false);
  const [openPollDialog, setOpenPollDialog] = React.useState(false);
  const [myFriendsLists, setMyFriendsLists] = React.useState([]);
  const [myPolls, setMyPolls] = React.useState([]);

  React.useEffect(() => {
      const requestOne = axios.get("/friends-list");
      const requestTwo = axios.get("/poll");
      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...res) => {
            const friendsListArr = res[0].data;
            const pollsArr = res[1].data;
            console.log(pollsArr);
            setMyFriendsLists(friendsListArr);
            setMyPolls(pollsArr);
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
  }, []);

  return (
    <>
      <article className={classes.article}>
        <div className={classes.header}>
          <Typography variant="h4" component="h2" className={classes.title}>
            Polls <span>({myPolls.length})</span>
          </Typography>

          <OutlinedBtn onClick={() => setOpenPollDialog(true)}>
            Create Poll
          </OutlinedBtn>
        </div>

        <div className={classes.cards}>
          {myPolls.map((poll, i) => (
            <Link to={`/dashboard/poll/${i}`} key={`poll-card-${i}`}>
              <PollCard {...poll} />
            </Link>
          ))}
        </div>
      </article>

      <article>
        <div className={classes.header}>
          <Typography variant="h4" component="h2" className={classes.title}>
            Friends Lists
          </Typography>

          <OutlinedBtn onClick={() => setOpenFriendDialog(true)}>
            Create List
          </OutlinedBtn>
        </div>
        <div className={classes.cards}>
          {myFriendsLists.map((list, i) => (
            <div key={`friends-list-card-${i}`}>
              <FriendsListCard {...list} />
            </div>
          ))}
        </div>
      </article>

      <FriendsListDialog
        open={openFriendDialog}
        onClose={() => setOpenFriendDialog(false)}
      />
      <PollDialog
        open={openPollDialog}
        handleClose={() => setOpenPollDialog(false)}
      />
    </>
  );
}
