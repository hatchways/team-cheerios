import React from "react";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getMyFriendsLists } from "../../apis/friendsList";

const useStyles = makeStyles(() => ({
  root: {
    flex: "50%",
  },
  inputField: {
    width: "100%",
  },
}));

export default function DialogContent({
  onChangeList,
  onChangeQuestion,
  defaultList,
  defaultQuestion,
  ...props
}) {
  const classes = useStyles();
  const [friendsListName, setFriendsListName] = React.useState("");
  const [myLists, setMyLists] = React.useState([]);

  React.useEffect(() => {
    getMyFriendsLists().then((res) => {
      setMyLists(res);
      setFriendsListName(defaultList);
    });
  }, [defaultList]);

  const handleChangeList = (event) => {
    const option = event.target.value;
    setFriendsListName(option);
    onChangeList(option);
  };

  return (
    <div className={classes.root} {...props}>
      <h3>Question: </h3>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Text Here"
          variant="outlined"
          value={defaultQuestion}
          onChange={(e) => onChangeQuestion(e.target.value)}
          className={classes.inputField}
        />
      </form>

      <h3>Friend list: </h3>
      <FormControl variant="outlined" className={classes.inputField}>
        <InputLabel id="select-friends-list">Select</InputLabel>
        <Select
          value={friendsListName}
          onChange={handleChangeList}
          label="Select"
          labelId="select-friends-list"
        >
          {myLists.length ? (
            myLists.map((list, i) => (
              <MenuItem key={`friends-list-${i}`} value={list._id}>
                {list.title}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Please Create a FriendsList First</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
