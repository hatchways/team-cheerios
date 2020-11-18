import React from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import uploadtoS3 from "../../utils/uploadtoS3";
const useStyles = makeStyles(() => ({
  closeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  uploadButton: {
    position: "absolute",
    top: "8.5rem",
  },
}));

export default function Profile({ open, handleCloseDialog }) {
  const {
    state: { user },
    dispatch,
  } = React.useContext(UserContext);
  const classes = useStyles();

  const [image, setImage] = React.useState(user.image);
  const [file, setFile] = React.useState(null);

  const uploadFile = (e) => {
    let formData = new FormData();
    formData.append("image", file);
    uploadtoS3(formData)
      .then((url) => {
        dispatch({
          type: "SET_USER",
          payload: {
            user: {
              ...user,
              image: url[0],
            },
          },
        });
        return url[0];
      })
      .then((url) => {
        axios
          .put("/change-picture", { email: user.email, image: url })
          .then((res) => setImage(url))
          .then((err) => console.log(err));
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Profile Options</DialogTitle>
        <DialogContent>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </IconButton>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <IconButton>
              <Avatar
                src={image}
                style={{
                  margin: "10px",
                  width: "60px",
                  height: "60px",
                }}
              />
            </IconButton>
          </label>
        </DialogContent>
        <DialogContent>
          <Button className={classes.uploadButton} onClick={uploadFile}>
            Upload!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
