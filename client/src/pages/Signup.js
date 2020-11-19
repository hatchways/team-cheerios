import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Logo from "../components/Logo"

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
;

export default function SignUp() {
  //const { state, dispatch } = React.useContext(UserContext);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const classes = useStyles();
  let history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(name);
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("/api/users",user)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.response));
    
    history.push("/login");
  };

  return (
    <Grid container component="main" className={classes.root}>
    <CssBaseline />

    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
      <Logo className = {classes.avatar}/>
        <Typography component="h1" variant="h3">
          Create an account
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
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
            onClick = {handleSignup}
          >
            Create
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
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
