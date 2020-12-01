import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import Profile from "../components/PublicProfile/ProfilePage";
import { NAVBAR_HEIGHT } from "../utils/constants";

export default function Friends() {
  return (
    <DashboardLayout
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
      }}
    >
      <Profile />
    </DashboardLayout>
  );
}
