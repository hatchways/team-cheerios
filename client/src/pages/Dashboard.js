import React from "react";
import { Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { NAVBAR_HEIGHT } from "../utils/constants";
import DashboardLayout from "../components/DashboardLayout";
import ProfileView from "../components/ProfileView";
import PollView from "../components/PollView";
import Sidebar from "../components/Sidebar";

const useStyles = makeStyles(() => ({
  root: {
    background: "#FAFBFE",
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
  },
  leftPane: {
    padding: "2.5rem",
    background: "#FFFFFF",
    height: "100%",
    overflow: "scroll",
  },
  rightPane: {
    flexGrow: 1,
    padding: "2.5rem",
    height: "100%",
    overflow: "scroll",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <DashboardLayout>
      <Grid container className={classes.root}>
        <Box
          component={Grid}
          item
          sm={4}
          md={3}
          className={classes.leftPane}
          display={{ xs: "none", sm: "block" }}
        >
          <Sidebar />
        </Box>

        <Grid
          item
          sm={8}
          md={9}
          component="section"
          className={classes.rightPane}
        >
          <Switch>
            <Route exact path="/dashboard" render={() => <ProfileView />} />
            <Route
              exact
              path="/dashboard/poll/:pollId"
              render={({ match }) => <PollView pollId={match.params.pollId} />}
            />
          </Switch>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
