import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import FriendsPollsPage from "../components/FriendsPollsPage/FriendsPollsPage";

export default function FriendsPolls() {
  return (
    <DashboardLayout
      style={{
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <FriendsPollsPage />
    </DashboardLayout>
  );
}
