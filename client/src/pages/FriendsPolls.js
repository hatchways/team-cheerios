import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import FriendsPollsPage from "../components/FriendsPollsPage";
import { NAVBAR_HEIGHT } from "../utils/constants";

export default function Friends() {
  return (
    <DashboardLayout
      style={{
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
      }}
    >
      <FriendsPollsPage />
    </DashboardLayout>
  );
}
