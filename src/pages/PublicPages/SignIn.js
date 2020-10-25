import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Auth } from "aws-amplify";
import { navigate, Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  text: {
    backgroundColor: "#333333",
  },
  input: {
    color: "white",
  },
  newLabel: {
    color: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ setSignedIn }) {
  const classes = useStyles();

  return (
    <div style={style.page}>
      <Container style={style.cont} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            style={style.form}
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const username = e.target.elements.username.value;
              const password = e.target.elements.password.value;
              (async function () {
                try {
                  const user = await Auth.signIn(username, password);
                  console.log(user);
                  console.log(user.signInUserSession.idToken.jwtToken);
                  //   dispatch(setSignedIn(user));

                  setSignedIn(user);
                  navigate("/home");
                } catch (error) {
                  alert("error sigining in", error);
                }
              })();
            }}
          >
            <TextField
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.newLabel,
              }}
              className={classes.text}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              className={classes.text}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.newLabel,
              }}
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

//trying to imitate dark mode, want to add this to theme or global css

const style = {
  page: {
    display: "flex",
    alignItems: "center",
    height: "100vh",

    backgroundColor: "#0d0d0d",
  },
  cont: {
    borderRadius: "3px",
    height: "50%",
    color: "white",
    backgroundColor: "#262626",
  },
  form: {
    color: "white",
  },
  text: {
    color: "white",
  },
};
