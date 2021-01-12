import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";

import Background from "../assets/login_bg.png";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  formGrid: {
    minHeight: "100vh",
  },
  imageGrid: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("md")]: {
      backgroundPosition: "right 30% center",
    },
  },
  logo: {
    position: "absolute",
    top: "50px",
    left: "90px",
    [theme.breakpoints.down("xs")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  paper: {
    margin: theme.spacing(20, 4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "70%",
    maxWidth: 400,
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      textAlign: "center",
    },
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AuthPageLayout({
  children,
  page,
  open,
  setOpen,
  reason,
}) {
  const classes = useStyles();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container component="main">
      <CssBaseline />

      <Grid item xs={12} sm={6} elevation={6} className={classes.formGrid}>
        <Logo className={classes.logo} />

        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            {page}
          </Typography>

          <form className={classes.form}>{children}</form>
        </div>
      </Grid>

      <Grid item xs={false} sm={6} className={classes.imageGrid} />

      <div className={classes.snackbar}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {reason}
          </Alert>
        </Snackbar>
      </div>
    </Grid>
  );
}
