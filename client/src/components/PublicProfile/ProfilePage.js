import Axios from "axios";
import React from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Divider,
  makeStyles,
  styled,
  Typography,
  withStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import PollCard from "../ProfileView/PollCard";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    fontSize: "0.85rem",
    textAlign: "center",
    padding: "12px",
  },
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
  divider: {
    display: "relative",
    marginTop: "15px",
  },
  content: {
    marginLeft: "10px",
    marginTop: "50px",
    marginLeft: "400px",
  },
  root: {
    flexGrow: 1,
    overflowY: "scroll",
    display : "relative",
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
    padding: "10px",
  },
  cards: {
    display: "flex",
    minWidth: 25,
    minHeight: 100,
    marginTop: "2rem",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { state } = React.useContext(UserContext);
  const { userId } = useParams();
  const [isAFriend, setIsAFriend] = React.useState(false);
  const [friend, setFriend] = React.useState({});
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  //TODO: follow button if user is not friend
  React.useEffect(() => {
    axios
      .get(`/getFriendsInfo?userId=${userId}`)
      .then((res) => {
        const data = res?.data;
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item>
            <img src={data?.user.image} className={classes.img} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={12} container direction="column" spacing={3}>
              <Grid item>
                <Table style={{ width: 80 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Polls</TableCell>
                      <TableCell>Followers</TableCell>
                      <TableCell>Following</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {data?.polls.length ? data?.polls?.length : 0}
                      </TableCell>
                      <TableCell>
                        {data?.numOfFollowers ? data?.numOfFollowers : 0}
                      </TableCell>
                      <TableCell>
                        {data?.numOfFollowing ? data?.numOfFollowing : 0}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography className={classes.text}>
                  {data?.user.name}
                </Typography>
              </Grid>
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
                <Grid className={classes.cards} item xs={12} md={4} >
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
