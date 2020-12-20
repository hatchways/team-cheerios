import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { logout } from "../../apis/user";
import { UserContext } from "../../contexts/UserContext";
import Profile from "../ProfileOptions/Profile";

const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      margin: "0.5rem auto",
      fontSize: 18,
    },
  })
);

export default function ProfileMenu({ anchorEl, handleClose }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = React.useContext(UserContext);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout(state.user._id, dispatch);
    handleClose();
  };

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            padding: "0.5rem 1rem",
          },
        }}
      >
        <MenuItem className={classes.menuItem} onClick={() => setOpen(true)}>
          Profile
        </MenuItem>

        <MenuItem className={classes.menuItem} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>

      <Profile open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
}
