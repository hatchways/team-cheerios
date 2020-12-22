import React from "react";

import DashboardLayout from "../components/DashboardLayout";
import OpinionsPage from "../components/OpinionsPage";

export default function Opinions() {
  return (
    <DashboardLayout style={{ overflow: "scroll" }}>
      <OpinionsPage />
    </DashboardLayout>
  );
}
