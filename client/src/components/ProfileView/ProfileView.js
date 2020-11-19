import React from "react";
import { Link } from "react-router-dom";

import FriendsListDialog from "../FriendsListDialog";
import PollDialog from "../PollDialog/PollDialog";
import OutlinedBtn from "../OutlinedBtn";

export default function ProfileView() {
  const [openFriendDialog, setOpenFriendDialog] = React.useState(false);
  const [openPollDialog, setOpenPollDialog] = React.useState(false);

  return (
    <>
      <div>
        <h1>Polls</h1>
        <OutlinedBtn onClick={() => setOpenPollDialog(true)}>
          Create Poll
        </OutlinedBtn>

        <Link to={`/dashboard/poll/1`}>Poll 1</Link>
        <Link to={`/dashboard/poll/2`}>Poll 2</Link>
      </div>

      <div>
        <h1>Friends lists</h1>
        <OutlinedBtn onClick={() => setOpenFriendDialog(true)}>
          Create List
        </OutlinedBtn>
      </div>

      <FriendsListDialog
        open={openFriendDialog}
        onClose={() => setOpenFriendDialog(false)}
      />
      <PollDialog
        open={openPollDialog}
        handleClose={() => setOpenPollDialog(false)}
      />
    </>
  );
}
