import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";

import UserSkeleton from "./UserSkeleton";

export default function FriendsListSkeleton(props) {
  return (
    <div {...props}>
      <Skeleton
        variant="text"
        height={60}
        width={140}
        style={{ marginBottom: "2rem" }}
      />

      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
    </div>
  );
}
