import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ConfirmSignUp({ username, password, setSignedIn }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirm Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const code = e.target.elements.code.value;
            (async function () {
              try {
                const resp = await Auth.confirmSignUp(username, code);
                if (resp === "SUCCESS") {
                  const currentUser = await Auth.signIn(username, password);
                  const idToken =
                    currentUser.signInUserSession.idToken.jwtToken;
                  setSignedIn(currentUser);
                  navigate("/home");

                  //this is where the user will be entered into sql and could be given
                  // a default avatar picture

                  // const  await Auth.currentAuthenticatedUser());

                  // await axios
                  //   .post("http://localhost:4000/create-user", {
                  //     token: idToken,
                  //     avatar: "defaultAvatar/super-mario-run.jpg",
                  //   })
                  //   .then(() => {
                  //     setSignedIn(currentUser);
                  //     navigate("/home");
                  //   })
                  //   .catch((error) => console.log(error));
                }
              } catch (error) {
                console.log("error confirming sign up", error);
              }
            })();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="code"
                name="code"
                variant="outlined"
                required
                fullWidth
                id="code"
                label="code"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
