import React from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { UserContext } from "../../contexts/UserContext";
import { NAVBAR_HEIGHT } from "../../utils/constants";
import Logo from "../Logo";
import MenuBtn from "./MenuBtn";
import ProfileBtn from "./ProfileBtn";
import PollBtn from "../PollDialog/PollBtn";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      boxShadow: "0px 0px 30px rgba(230, 235, 248, 0.4)",
    },
    toolbar: {
      background: "#FFFFFF",
      minHeight: NAVBAR_HEIGHT,
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

export default function Navbar() {
  const classes = useStyles();
  const {
    state: { authenticated, user, loading },
  } = React.useContext(UserContext);

  if (!authenticated) return null;

  return (
    <AppBar position="fixed" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Link to="/dashboard">
          <Logo />
        </Link>

        <div className={classes.spacer} />

        <MenuBtn to="/friends" text="Friends" />
        <MenuBtn to="/friends-pools" text="Friends pools" />
        <MenuBtn to="/opinions" text="Opinions" />

        <PollBtn loading={loading} />

        <ProfileBtn user={user} loading={loading} />
      </Toolbar>
    </AppBar>
  );
}
