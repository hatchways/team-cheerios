import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";

export default function SectionSkeleton(props) {
  return (
    <div {...props}>
      <Skeleton
        variant="text"
        height={60}
        width={140}
        animation="wave"
        style={{ marginBottom: "1.5rem" }}
      />

      <div style={{ display: "flex" }}>
        <Skeleton
          variant="rect"
          height={340}
          width={340}
          animation="wave"
          style={{ marginBottom: "2.5rem" }}
        />

        <Skeleton
          variant="rect"
          height={340}
          width={340}
          animation="wave"
          style={{ margin: "0 0 2.5rem 4rem" }}
        />
      </div>
    </div>
  );
}
