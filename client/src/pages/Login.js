import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

import { SET_USER } from "../contexts/types";
import { UserContext } from "../contexts/UserContext";
import {
  Grid,
  Paper,
  TextField,
  Link,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Logo from "../components/Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://i.ibb.co/YRBjvKT/f1d2e32ad77c9c983af281c12eee46567109a4f6.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    position : "absolute",
    marginTop : "2rem",
    marginLeft: "2rem",
  },
  form: {
    width: "50%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
  submit: {
    margin: "1rem auto",
    borderRadius: 25,
    background: "#000000",
    padding: "0 1.5rem",
    height: 50,
    width: 150,
    color: "#FFFFFF",
    "&:hover": {
      border: "1px solid",
      background: "unset",
      color: "unset",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {dispatch } = React.useContext(UserContext);
  let history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
    };

    loginUser(newUser)
      .then((user) => {
        dispatch({
          type: SET_USER,
          payload: {
            user: {
              name: user.name,
              image: user.image,
              email: user.email,
            },
          },
        });
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Logo className = {classes.avatar}/>
          <Typography component="h1" variant="h3">
            Log In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={1} md={7} className={classes.image} />
    </Grid>
  );
}

const loginUser = async (user) => {
  try {
    const res = await axios.post("/api/auth", user);
    setAuth(res.data.token);
    return res.data.user;
  } catch (err) {
    console.error(err);
  }
};

const setAuth = (token) => {
  localStorage.setItem("HatchwayToken", token);
  axios.defaults.headers.common["x-auth-token"] = token;
};
