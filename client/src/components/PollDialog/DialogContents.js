import React from "react";

import { TextField, FormControl, InputLabel, Select } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
  },
  inputField: {
    width: "40%",
  },
}));

export default function DialogContent({
  onChangeList,
  onChangeText,
  ...props
}) {
  const classes = useStyles();
  const [friendListName, setFriendListName] = React.useState("");

  const handleChangeText = (event) => {
    onChangeText(event.target.value);
  };

  const handleChangeList = (event) => {
    const option = event.target.value;
    setFriendListName(option);
    onChangeList(option);
  };

  return (
    <div className={classes.root}>
      <h3>Question: </h3>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Text Here"
          variant="outlined"
          onChange={handleChangeText}
          className={classes.inputField}
        />
      </form>

      <h3>Friend list: </h3>
      <FormControl variant="outlined" className={classes.inputField}>
        <InputLabel htmlFor="outlined-age-native-simple">Select</InputLabel>
        <Select native value={friendListName} onChange={handleChangeList}>
          <option aria-label="None" value="" />
          <option value={"List 1"}>List 1</option>
          <option value={"List 2"}>List 2</option>
          <option value={"List 3"}>List 3</option>
        </Select>
      </FormControl>
    </div>
  );
}
