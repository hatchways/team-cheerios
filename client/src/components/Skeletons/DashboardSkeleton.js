import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { NAVBAR_HEIGHT } from "../../utils/constants";
import FriendsListSkeleton from "./FriendsListSkeleton";
import SectionSkeleton from "./SectionSkeleton";
import NavbarSkeleton from "./NavbarSkeleton";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    nav: {
      background: "#FFFFFF",
      height: `${NAVBAR_HEIGHT}px`,
    },
    body: {
      background: "#FAFBFE",
      height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    },
    leftPane: {
      padding: theme.spacing(5),
      background: "#ffffff",
      height: "100%",
      overflow: "scroll",
    },
    rightPane: {
      flexGrow: 1,
      padding: theme.spacing(5),
      height: "100%",
      overflow: "scroll",
    },
  })
);

export default function DashboardSkeleton() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <NavbarSkeleton />

      <Grid container className={classes.body}>
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
    </section>
  );
}
