import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import PublicProfile from "../components/PublicProfile";
import { NAVBAR_HEIGHT } from "../utils/constants";

export default function Profile() {
  return (
    <DashboardLayout
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT})`,
      }}
    >
      <PublicProfile />
    </DashboardLayout>
  );
}
