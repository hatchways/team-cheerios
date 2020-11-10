import React from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { UserContext } from "../../contexts/UserContext";
import { NAVBAR_HEIGHT } from "../../utils/constants";
import CreateBtn from "../CreateBtn";
import Logo from "../Logo";
import MenuBtn from "./MenuBtn";
import ProfileBtn from "./ProfileBtn";

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      background: "#ffffff",
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
    state: { authenticated, user },
  } = React.useContext(UserContext);

  if (!authenticated) return null;

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <Logo />
        </Link>

        <div className={classes.spacer} />

        <MenuBtn to="/friends" text="Friends" />
        <MenuBtn to="/friends-pools" text="Friends pools" />
        <MenuBtn to="/opinions" text="Opinions" />

        <CreateBtn onClick={() => console.log("open dialog")}>
          create pool
        </CreateBtn>

        <ProfileBtn user={user} />
      </Toolbar>
    </AppBar>
  );
}
