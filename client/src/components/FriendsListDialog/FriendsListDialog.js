import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";

import { theme } from "../../themes/theme";
import Friend from "./Friend";

const useStyles = makeStyles({
  title: {
    marginTop: "2rem",
    textAlign: "center",
    "& h2": {
      fontSize: 30,
    },
  },
  closeButton: {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
  },
  inputWrapper: {
    padding: "1rem",
    textAlign: "center",
  },
  input: { maxWidth: 420 },
  listTitle: {
    margin: "2rem 0 1rem",
    fontWeight: "bold",
  },
  listWrapper: {
    margin: "0 auto",
    padding: "0.5rem",
  },
  list: {
    margin: "0 auto",
    width: "90vw",
    maxWidth: 520,
    height: "50vh",
    maxHeight: 300,
    overflow: "scroll",
  },
  btn: {
    margin: "1rem auto",
    borderRadius: 25,
    background: "#000000",
    padding: "0 1.5rem",
    height: 50,
    width: 150,
    color: "#FFFFFF",
    "&:hover": {
      border: "1px solid",
      background: "unset",
      color: "unset",
    },
  },
});

export default function FriendsListDialog({ open, onClose, ...rest }) {
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [listName, setListName] = React.useState("");
  const [friendsList, setFriendsList] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

  // TODO: fetch friends
  React.useEffect(() => {
    if (open) {
      axios
        .get("/friends")
        .then((res) => {
          setFriends(res.data?.friends);
        })
        .catch((err) => console.log(err));
    }
  }, [open]);

  const handleAdd = (user) => setFriendsList([...friendsList, user]);

  const handleDelete = (user) => {
    const newList = friendsList.filter((friend) => friend.name !== user.name);
    setFriendsList(newList);
  };

  const handleChange = (e) => {
    e.preventDefault();

    setListName(e.target.value);
  };

  const handleCreate = (e) => {
    // TODO: create new friends list
    console.log(`create new friend list: ${listName}`);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth={true}
      PaperProps={{ style: { position: "relative" } }}
      {...rest}
    >
      <DialogTitle className={classes.title}>Create a friend list</DialogTitle>

      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.inputWrapper}>
        <TextField
          autoFocus
          id="list-name"
          label="Enter name of the list"
          variant="outlined"
          fullWidth
          className={classes.input}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogContent className={classes.listWrapper}>
        <Typography variant="h5" component="p" className={classes.listTitle}>
          Add friends:
        </Typography>

        <div className={classes.list}>
          {friends.map((user, i) => (
            <Friend
              user={user}
              friendsList={friendsList}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              key={`friend-${i}`}
            />
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCreate} className={classes.btn}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
