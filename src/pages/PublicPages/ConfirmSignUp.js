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
import Axios from "axios";

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
    backgroundColor: "#00bc66",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00bc66",
  },
}));

function randomPic() {
  const arr = [
    "defaultAvatar/jersey1.png",
    "defaultAvatar/jersey2.png",
    "defaultAvatar/jersey3.png",
    "defaultAvatar/jersey4.png",
    "defaultAvatar/jersey5.png",
    "defaultAvatar/jersey6.png",
  ];
  return arr[Math.floor(Math.random() * 6)];
}

export default function ConfirmSignUp({ username, password, setSignedIn }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon style={{ fill: "black" }} />
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
                console.log(resp);
                if (resp === "SUCCESS") {
                  const currentUser = await Auth.signIn(username, password);
                  console.log("current user", currentUser);
                  const idToken =
                    currentUser.signInUserSession.idToken.jwtToken;
                  console.log(idToken);
                  setSignedIn(currentUser);
                  console.log("outside create");

                  setTimeout(function () {
                    navigate("/home");
                  }, 2000);

                  const pic = randomPic();
                  await Axios.post("http://localhost:4000/create-user", {
                    token: idToken,
                    avatar: pic,
                  });
                  console.log("hello");
                  setSignedIn(currentUser);

                  //   await axios
                  //     .post("http://localhost:4000/create-user", {
                  //       token: idToken,
                  //       avatar: "defaultAvatar/goldenRet.png",
                  //     })
                  //     .then(() => {
                  //       console.log("never gets here");
                  //       setSignedIn(currentUser);
                  //       navigate("/home");
                  //     })
                  //     .catch((error) => console.log("ERROR", error));
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
            <Grid item xs={12}></Grid>
          </Grid>
          <Button type="submit" fullWidth className={classes.submit}>
            Confirm
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
