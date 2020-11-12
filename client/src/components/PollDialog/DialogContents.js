import React from "react";
import DropZone from "./DropZone";

import { TextField, FormControl, InputLabel, Select } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
  },
  formControl: {
    width: "40%",
  },
  dropControlTop: {
    position: "absolute",
    top: "3rem",
    right: "4rem",
  },
  dropControlBot: {
    position: "absolute",
    top: "20rem",
    right: "4rem",
  },
}));

export default function DialogContent({ handleClose, ...rest }) {
  const classes = useStyles();
  const [friendListName, setFriendListName] = React.useState("");

  const handleChange = (event) => {
    setFriendListName(event.target.value);
  };

  return (
    <div className={classes.root}>
      <h3>Question: </h3>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Text Here"
          variant="outlined"
          style={{ width: "40%" }}
        />
      </form>
      <div className={classes.dropControlTop}>
        <DropZone accept="image/*" />
      </div>

      <h3>Friend list: </h3>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Select</InputLabel>
        <Select native value={friendListName} onChange={handleChange}>
          <option aria-label="None" value="" />
          <option value={10}>List 1</option>
          <option value={20}>List 2</option>
          <option value={30}>List 3</option>
        </Select>
      </FormControl>

      <div className={classes.dropControlBot}>
        <DropZone accept="image/*" />
      </div>
    </div>
  );
}
