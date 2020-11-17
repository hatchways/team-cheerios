import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import UserSkeleton from "../Skeletons/UserSkeleton";
import ProfileMenu from "./ProfileMenu";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
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

export default function ProfileBtn({ user, loading, dispatch, ...rest }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  

  const handleImage = () => {

  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <UserSkeleton />;

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

      <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} dispatch = {dispatch} />
    </>
  );
}
