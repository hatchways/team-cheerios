import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { getOpinions } from "../../apis/opinions";
import FriendVote from "../PollView/FriendVote";
import OpinionsSkeleton from "../Skeletons/OpinionsSkeleton";

const useStyles = makeStyles({
  root: {
    "& a:visited": {
      color: "inherit",
    },
  },
  opinion: {
    textDecoration: "none",

    "& > div": {
      margin: "0 auto",
    },
  },
  emptyMsg: {
    marginTop: "3rem",
    textAlign: "center",
  },
  skeleton: {
    "& > span": {
      margin: "0 auto",
    },
  },
});

export default function OpinionsPage() {
  const classes = useStyles();
  const [opinions, setOpinions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    getOpinions().then((res) => {
      if (res) setOpinions(res);
      setLoading(false);
    });
  }, []);

  return (
    <Container className={classes.root}>
      {loading ? (
        <OpinionsSkeleton className={classes.skeleton} />
      ) : opinions.length !== 0 ? (
        opinions.map((opinion, i) => (
          <div className={classes.opinion} key={`opinion-${i}`}>
            <FriendVote data={opinion} images={opinion.images} />
          </div>
        ))
      ) : (
        <Typography variant="h5" className={classes.emptyMsg}>
          No Opinions Yet
        </Typography>
      )}
    </Container>
  );
}
