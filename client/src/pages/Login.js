import React from "react";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Paper,
  TextField,
  Link,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";

import { loginUser } from "../apis/user";
import Background from "../assets/login_bg.png";
import Logo from "../components/Logo";
import { SET_USER } from "../contexts/types";
import { UserContext } from "../contexts/UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Background})`,
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
    position: "absolute",
    marginTop: "2rem",
    marginLeft: "2rem",
  },
  form: {
    width: "50%",
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
  const [errEmail, setErrEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { dispatch } = React.useContext(UserContext);
  let history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validate = () => {
    let isError = false;
    if (email === "" || email.indexOf("@") === -1) {
      setErrEmail("Please enter a valid email");
      isError = true;
    }
    return isError;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
      const newUser = {
        email,
        password,
      };

      loginUser(newUser)
        .then((user) => {
          if (user) {
            const { name, image, email } = user;
            dispatch({
              type: SET_USER,
              payload: {
                user: { name, image, email },
              },
            });
            history.push("/dashboard");
          } else {
            setOpen(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo className={classes.avatar} />
          <Typography component="h1" variant="h3">
            Log In
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errEmail !== ""}
              helperText={errEmail}
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
              onClick={handleClick}
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
        <div className={classes.snackbar}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Error ! Your email or password is incorrect !
            </Alert>
          </Snackbar>
        </div>
      </Grid>
      <Grid item xs={false} sm={1} md={7} className={classes.image} />
    </Grid>
  );
}
