import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { deletePoll } from "../../apis/poll";

export default function ConfirmationDeleteDialog({
  pollId,
  open,
  handleClose,
}) {
  let history = useHistory();

  const handleConfirm = async () => {
    await deletePoll(pollId).then(() => {
      handleClose();
      history.push("/dashboard");
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle>Delete a Poll</DialogTitle>

      <DialogContent>
        <DialogContentText color="inherit">
          Do you want to delete this poll?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
