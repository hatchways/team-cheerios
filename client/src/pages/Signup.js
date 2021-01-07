import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import { signup } from "../apis/user";
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

export default function SignUp() {
  const classes = useStyles();
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
  const { passwordErr, emailErr, retypePassErr, nameErr } = validError;
  let history = useHistory();

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
    let errorMessage = {};

    if (email.indexOf("@") === -1 || email === "" || email.length < 5) {
      errorMessage.emailErr =
        "Please enter a valid email with at least 5 characters";
    }
    if (password.length < 5) {
      errorMessage.passwordErr = "Password should be at least 8 characters";
    }
    if (password !== rePassword && password !== "") {
      errorMessage.retypePassErr = "Passwords do not match";
    }
    if (name.length < 3 || name.length > 30) {
      errorMessage.nameErr =
        "Name should be at least 3 characters long. Maximum length of 30 allowed";
    }

    setValidError({ ...errorMessage });
    return errorMessage === {};
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
        .then((res) => {
          if (res.data.user) {
            const { name, image, email, _id } = res.data.user;
            dispatch({
              type: SET_USER,
              payload: {
                user: { name, image, email, _id },
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
    <AuthPageLayout
      page="Create an account"
      open={open}
      setOpen={setOpen}
      reason={reason}
    >
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

      <div>
        <Link href="/" variant="body2">
          {"Already have an account? Sign In"}
        </Link>
      </div>
    </AuthPageLayout>
  );
}
