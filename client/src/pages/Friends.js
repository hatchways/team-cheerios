import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import FriendsPage from "../components/FriendsPage";

export default function Friends() {
  return (
    <DashboardLayout
      style={{
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <FriendsPage />
    </DashboardLayout>
  );
}
