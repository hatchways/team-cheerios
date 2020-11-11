import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import DashboardSkeleton from "../components/Skeletons/DashboardSkeleton";
import { UserContext } from "../contexts/UserContext";

export default function Dashboard() {
  const {
    state: { loading },
  } = React.useContext(UserContext);

  return (
    <DashboardLayout>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div>
          <h1>Dashboard</h1>
        </div>
      )}
    </DashboardLayout>
  );
}
