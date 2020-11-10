import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import ProfileMenu from "./ProfileMenu";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(5),
      cursor: "pointer",
      height: 50,
    },
    avatar: {
      marginRight: theme.spacing(1),
      width: 50,
      height: 50,
    },
    userName: {
      fontSize: 18,
      textTransform: "none",
      color: "black",
    },
  })
);

export default function ProfileBtn({ user, ...rest }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.root}
        onClick={handleClick}
        aria-controls="simple-menu"
        {...rest}
      >
        <Avatar alt={user.name} src={user.image} className={classes.avatar} />
        <span className={classes.userName}>{user.name}</span>
      </Button>

      <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
}
