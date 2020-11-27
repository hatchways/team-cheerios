import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";

export default function PollViewSkeleton(props) {
  return (
    <div {...props}>
      <Skeleton variant="text" height={30} width={100} animation="wave" />

      <Skeleton
        variant="text"
        height={50}
        width={140}
        animation="wave"
        style={{ marginBottom: "1.5rem" }}
      />

      <div style={{ display: "flex" }}>
        <Skeleton
          variant="rect"
          height={100}
          width={100}
          animation="wave"
          style={{ marginBottom: "2rem" }}
        />

        <Skeleton
          variant="rect"
          height={100}
          width={100}
          animation="wave"
          style={{ margin: "0 0 2rem 1rem" }}
        />
      </div>

      <Skeleton variant="text" height={100} width={500} animation="wave" />
      <Skeleton variant="text" height={100} width={500} animation="wave" />
    </div>
  );
}
