import React from "react";
import OutlinedBtn from "../OutlinedBtn";
import PollDialog from "./PollDialog";
import UserSkeleton from "../Skeletons/UserSkeleton";

export default function PollBtn({ loading, ...rest }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <UserSkeleton />;

  return (
    <OutlinedBtn disabled={open} onClick={handleClick}>
      Create Poll
      <PollDialog open={open} handleClose={handleClose} {...rest} />
    </OutlinedBtn>
  );
}
