import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

import Background from "../assets/login_bg.png";
import { signup } from "../apis/user";
import Logo from "../components/Logo";
import { SET_USER } from "../contexts/types";
import { UserContext } from "../contexts/UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
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

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const { dispatch } = React.useContext(UserContext);
  const [validError, setValidError] = React.useState({
    passwordErr: "",
    emailErr: "",
    retypePassErr: "",
    nameErr: "",
  });
  const classes = useStyles();
  let history = useHistory();
  const { passwordErr, emailErr, retypePassErr, nameErr } = validError;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const reset = () => {
    setValidError({
      passwordErr: "",
      emailErr: "",
      retypePassErr: "",
      nameErr: "",
    });
  };

  const validate = () => {
    reset();
    let isErr = false;
    if (email.indexOf("@") === -1 || email === "" || email.length < 5) {
      setValidError({
        ...validError,
        emailErr: "Please enter a valid email with at least 5 characters",
      });
      isErr = true;
    }
    if (password.length < 5) {
      setValidError({
        ...validError,
        passwordErr: "Password should be at least 8 characters",
      });
      isErr = true;
    }
    if (password !== rePassword && password !== "") {
      setValidError({ ...validError, retypePassErr: "Passwords do not match" });
      isErr = true;
    }
    if (name.length < 3 || name.length > 10) {
      setValidError({
        ...validError,
        nameErr:
          "Name should be at least 3 characters long. Maximum length of 10 allowed",
      });
      isErr = true;
    }
    return isErr;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const isErr = validate();
    if (!isErr) {
      const newUser = {
        name,
        email,
        password,
      };

      signup(newUser)
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
          }
        })
        .catch((error) => {
          setReason(error.response.data);
          setOpen(true);
        });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Logo className={classes.avatar} />
          <Typography component="h1" variant="h3">
            Create an account
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              error={nameErr !== ""}
              autoFocus
              helperText={nameErr}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={emailErr !== "" || reason !== ""}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={emailErr}
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
              error={passwordErr !== ""}
              helperText={passwordErr}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Re-type password"
              type="password"
              value={rePassword}
              id="password2"
              error={retypePassErr !== ""}
              autoComplete="current-password"
              helperText={retypePassErr}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignup}
            >
              Create
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <div className={classes.snackbar}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {reason}
            </Alert>
          </Snackbar>
        </div>
      </Grid>
      <Grid item xs={false} sm={1} md={7} className={classes.image} />
    </Grid>
  );
}
