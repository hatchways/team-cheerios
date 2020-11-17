import React from "react";
import { useHistory } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
  let history = useHistory();
  const [open , setOpen] = React.useState(false);


  const handleLogout = () => {
    // TODO: logout
    handleClose();
  };

  return (
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
      <MenuItem
        className={classes.menuItem}
        onClick={() => history.push("/profile")}
      >
        Profile
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  );
}
