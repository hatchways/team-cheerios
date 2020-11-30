import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import User from "../User";

const useStyles = makeStyles({
  root: {
    borderBottom: "0.5px solid #E8EBF6",
    alignItems: "center",
    padding: "0.5rem",
    height: "4rem",
  },
});

const StyledButton = withStyles({
  root: {
    borderRadius: 18,
    padding: "1rem 0.5rem",
    background: "#62CD4D",
    width: "100%",
    height: 36,
    fontSize: "0.85rem",
    fontWeight: "unset",
    textTransform: "none",
    color: "#FFFFFF",
    "&:hover": {
      background: "#53BC45",
    },
  },
})(MuiButton);

const CancelRequestButton = withStyles({
  root: {
    background: "#E0E0E0",
    color: "#333333",
    "&:hover": {
      background: "#BDBDBD",
    },
  },
})(StyledButton);

const UnfollowButton = withStyles({
  root: {
    background: "#FF5D5D",
    "&:hover": {
      background: "#FF4C43",
    },
  },
})(StyledButton);

const AcceptButton = withStyles({
  root: { width: "50%" },
})(UnfollowButton);

const IgnoreButton = withStyles({
  root: { width: "50%" },
})(CancelRequestButton);

export default function FriendCard({ _id, name, image, status, handleClick }) {
  const classes = useStyles();

  const Button = (props) => {
    switch (status) {
      case "sent":
        return (
          <CancelRequestButton
            onClick={() => handleClick(_id, "cancel")}
            {...props}
          >
            cancel request
          </CancelRequestButton>
        );
      case "following":
        return (
          <UnfollowButton
            onClick={() => handleClick(_id, "unfollow")}
            {...props}
          >
            unfollow
          </UnfollowButton>
        );
      case "received":
        return (
          <>
            <AcceptButton onClick={() => handleClick(_id, "accept")} {...props}>
              accept
            </AcceptButton>
            <IgnoreButton onClick={() => handleClick(_id, "ignore")} {...props}>
              ignore
            </IgnoreButton>
          </>
        );
      case "follower":
        return <CancelRequestButton disabled>follower</CancelRequestButton>;
      default:
        return (
          <StyledButton onClick={() => handleClick(_id, "follow")} {...props}>
            follow
          </StyledButton>
        );
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs>
        <User _id = {_id} name={name} image={image} />
      </Grid>

      <Grid item xs={5} sm={4}>
        <Button />
      </Grid>
    </Grid>
  );
}
