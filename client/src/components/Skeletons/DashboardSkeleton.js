import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { NAVBAR_HEIGHT } from "../../utils/constants";
import FriendsListSkeleton from "./FriendsListSkeleton";
import SectionSkeleton from "./SectionSkeleton";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: "#FAFBFE",
      height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      overflow: "hidden",
    },
    leftPane: {
      padding: theme.spacing(5),
      background: "#ffffff",
      overflow: "scroll",
    },
    rightPane: {
      flexGrow: 1,
      padding: theme.spacing(5),
      overflow: "scroll",
    },
  })
);

export default function DashboardSkeleton() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Box
        component={Grid}
        item
        sm={4}
        md={3}
        className={classes.leftPane}
        display={{ xs: "none", sm: "block" }}
      >
        <FriendsListSkeleton />
      </Box>

      <Grid item sm={8} md={9} className={classes.rightPane}>
        <SectionSkeleton />
        <SectionSkeleton />
      </Grid>
    </Grid>
  );
}
