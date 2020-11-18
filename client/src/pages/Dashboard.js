import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import FriendsListDialog from "../components/FriendsListDialog";
import OutlinedBtn from "../components/OutlinedBtn";
import DashboardSkeleton from "../components/Skeletons/DashboardSkeleton";
import { UserContext } from "../contexts/UserContext";

export default function Dashboard() {
  const {
    state: { loading },
  } = React.useContext(UserContext);
  const [openFriendDialog, setOpenFriendDialog] = React.useState(false);

  return (
    <DashboardLayout>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div>
          <h1>Dashboard</h1>

          <OutlinedBtn onClick={() => setOpenFriendDialog(true)}>
            Create List
          </OutlinedBtn>

          <FriendsListDialog
            open={openFriendDialog}
            onClose={() => setOpenFriendDialog(false)}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
