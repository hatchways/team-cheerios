import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";

export default function OpinionsSkeleton(props) {
  return (
    <div {...props}>
      <Skeleton variant="text" height={100} width={500} animation="wave" />
      <Skeleton variant="text" height={100} width={500} animation="wave" />
      <Skeleton variant="text" height={100} width={500} animation="wave" />
    </div>
  );
}
