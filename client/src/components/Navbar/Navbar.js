import React from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { UserContext } from "../../contexts/UserContext";
import { NAVBAR_HEIGHT } from "../../utils/constants";
import OutlinedBtn from "../OutlinedBtn";
import Logo from "../Logo";
import MenuBtn from "./MenuBtn";
import ProfileBtn from "./ProfileBtn";

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
    poolBtn: {
      padding: "0.5rem 1rem",
      borderRadius: "",
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
        <Link to="/">
          <Logo />
        </Link>

        <div className={classes.spacer} />

        <MenuBtn to="/friends" text="Friends" />
        <MenuBtn to="/friends-pools" text="Friends pools" />
        <MenuBtn to="/opinions" text="Opinions" />

        <OutlinedBtn onClick={() => console.log("open dialog")}>
          create pool
        </OutlinedBtn>

        <ProfileBtn user={user} loading={loading} />
      </Toolbar>
    </AppBar>
  );
}
