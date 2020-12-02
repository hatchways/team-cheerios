import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, Grid } from "@material-ui/core";
import PollCard from "../ProfileView/PollCard";
import { Link } from "react-router-dom";
import { getInvitedPolls } from "../../apis/poll";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "column",
    overflowY: "scroll",
    height: "650px",
    width: "100%",
  },
  content: {
    marginTop: "20px",
  },
  cards: {
    display: "flex",
    minWidth: 20,
    minHeight: 100,
    marginTop: "2rem",
    marginLeft:"3rem",
    textDecoration: "none",
  },
}));

export default function FriendsPollsPage() {
  const [polls, setPolls] = React.useState("");
  const classes = useStyles();
  React.useEffect(() => {
    getInvitedPolls().then((polls) => setPolls(polls));
  }, []);

  return (
    <div className={classes.root}>
      <h2>You were invited to the following polls</h2>
      <Box m={0.75} ml={10} mr={10}>
        <Divider/>
        <div>
          <Grid container direction="row" spacing={3}>
            {polls?.length ? (
              polls.map((poll) => (
                <Grid
                  className={classes.cards}
                  item
                  xs={12}
                  md="auto"
                  key={poll._id}
                >
                  <Link
                    to={`/dashboard/poll/${poll._id}`}
                    key={`poll-card-${poll._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <PollCard {...poll} />
                  </Link>
                </Grid>
              ))
            ) : (
              <h2> No polls present</h2>
            )}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
