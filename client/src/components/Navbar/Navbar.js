import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { UserContext } from "../../contexts/UserContext";
import { NAVBAR_HEIGHT, MOBILE_NAV_HEIGHT } from "../../utils/constants";
import PollBtn from "../PollDialog/PollBtn";
import Logo from "../Logo";
import MenuBtn from "./MenuBtn";
import ProfileBtn from "./ProfileBtn";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 0px 30px rgba(230, 235, 248, 0.4)",
  },
  toolbar: {
    background: "#FFFFFF",
    minHeight: NAVBAR_HEIGHT,

    [theme.breakpoints.down("sm")]: {
      minHeight: MOBILE_NAV_HEIGHT,
    },
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      height: 48,
      width: 48,
    },
  },
  spacer: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const {
    state: { authenticated, user, loading },
  } = React.useContext(UserContext);

  if (!authenticated) return null;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={classes.root}
      color="transparent"
    >
      <Toolbar className={classes.toolbar}>
        <Link to="/dashboard">
          <Logo className={classes.logo} />
        </Link>

        <div className={classes.spacer} />

        <MenuBtn to="/friends" text="Friends" />
        <MenuBtn to="/friends-polls" text="Friends polls" />
        <MenuBtn to="/opinions" text="Opinions" />

        <PollBtn user={user} loading={loading} />

        <ProfileBtn user={user} loading={loading} />
      </Toolbar>
    </AppBar>
  );
}
