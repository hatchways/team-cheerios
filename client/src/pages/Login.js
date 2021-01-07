import React from "react";
import { useHistory } from "react-router-dom";

import { TextField, Link, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { loginUser } from "../apis/user";
import AuthPageLayout from "../components/AuthPageLayout";
import { SET_USER } from "../contexts/types";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
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
  const [errPassword, setErrPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const { dispatch } = React.useContext(UserContext);
  let history = useHistory();

  const validate = () => {
    let isError = false;
    setErrEmail("");
    setErrPassword("");

    if (email === "" || email.indexOf("@") === -1) {
      setErrEmail("Please enter a valid email");
      isError = true;
    }
    if (password === "") {
      setErrPassword("Please enter a valid password");
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
            const { name, image, email, _id } = user;
            dispatch({
              type: SET_USER,
              payload: {
                user: { name, image, email, _id },
              },
            });
            history.push("/dashboard");
            import("../utils/socket").then((socket) => {
              socket.socket.emit("log in", _id);
            });
          } else {
            setReason("Error ! Your email or password is incorrect !");
            setOpen(true);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <AuthPageLayout page="Log In" open={open} setOpen={setOpen} reason={reason}>
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
        error={errPassword !== ""}
        helperText={errPassword}
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

      <div>
        <Link href="/signup" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </AuthPageLayout>
  );
}
