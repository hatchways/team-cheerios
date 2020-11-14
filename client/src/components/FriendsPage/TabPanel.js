import React from "react";

import Box from "@material-ui/core/Box";

export default function TabPanel({ children, value, index, ...rest }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...rest}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
