import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getFollowings } from "../../apis/friends";
import User from "../User";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  title: {
    marginBottom: "1.5rem",
    paddingTop: 7.5,
  },
  list: {
    overflow: "scroll",
  },
  noFriends: {
    "& a": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [friends, setFriends] = React.useState([]);
  const { state } = React.useContext(UserContext);

  React.useEffect(() => {
    getFollowings().then((list) => setFriends(list));
  }, []);

  return (
    <aside className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.title}>
        Friends
      </Typography>

      <div>
        {!friends.length ? (
          <Typography
            variant="body1"
            component="p"
            className={classes.noFriends}
          >
            No friends yet <br />
            Go to <Link to="/friends">Friends page</Link> to add friends
          </Typography>
        ) : (
          friends.map((friend, i) => (
            <User
              {...friend}
              active={state.activeUsers?.has(friend._id)}
              key={`my-friend-${i}`}
              style={{ marginBottom: "1rem" }}
            />
          ))
        )}
      </div>
    </aside>
  );
}
