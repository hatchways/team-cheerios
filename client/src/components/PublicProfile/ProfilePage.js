import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  makeStyles,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";

import PollCard from "../ProfileView/PollCard";
import { followFriend } from "../../apis/friends";
import Dummy from "../../assets/dummy.png";

const useStyles = makeStyles(() => ({
  divider: {
    display: "relative",
    marginTop: "15px",
  },
  content: {
    marginTop: "50px",
  },
  root: {
    display:"flex",
    flexDirection:"column",
    flexGrow: 1,
    alignItems: "center",
    overflowY: "scroll",
    height: "650px",
  },
  img: {
    display: "relative",
    width: "170px",
    height: "170px",
    borderRadius: "85px",
    alignItems: "center",
  },
  text: {
    fontSize: "1.15rem",
    fontWeight: "600",
    marginLeft: "40px",
    marginTop: "20px",
  },
  cards: {
    display: "flex",
    minWidth: 25,
    minHeight: 100,
    marginTop: "2rem",
  },
  ul: {
    display: "flex",
  },
  li: {
    display: "inline",
    marginRight: "40px",
    fontSize: "16px",
    marginTop: "40px",
  },
  number: {
    fontWeight: 600,
  },
  button: {
    marginLeft: "40px",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { userId } = useParams();
  const [isAFriend, setIsAFriend] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/getFriendsInfo?userId=${userId}`)
      .then((res) => {
        const data = res?.data;
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setIsAFriend(false);
        setLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  const sendRequest = () => {
    followFriend(userId);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item>
            {!data?.user.image ? (
              <img src={Dummy} className={classes.img} alt = "User" />
            ) : (
              <img src={data?.user.image} className={classes.img} alt="User" />
            )}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={12} container direction="column" spacing={3}>
              <Grid item>
                <ul className={classes.ul}>
                  <li className={classes.li}>
                    <span className={classes.number}>
                      {data?.polls.length ? data?.polls?.length : 0}
                    </span>{" "}
                    polls
                  </li>
                  <li className={classes.li}>
                    <span className={classes.number}>
                      {" "}
                      {data?.numOfFollowers ? data.numOfFollowers : 0}
                    </span>{" "}
                    followers
                  </li>
                  <li className={classes.li}>
                    <span className={classes.number}>
                      {" "}
                      {data?.numOfFollowing ? data?.numOfFollowing : 0}
                    </span>{" "}
                    following
                  </li>
                </ul>

                <Typography className={classes.text}>
                  {data?.user.name}
                </Typography>
              </Grid>
              {!isAFriend && !loading ? (
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => sendRequest()}
                  >
                    Follow
                  </Button>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Box p={1} pl={35} pr={35}>
        <Divider className={classes.divider} />
        <div>
          <Grid container spacing={1}>
            {data?.polls.length ? (
              data.polls.map((poll) => (
                <Grid className={classes.cards} item xs={12} md={4}>
                  <PollCard {...poll} />
                </Grid>
              ))
            ) : (
              <h2> No polls present</h2>
            )}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
