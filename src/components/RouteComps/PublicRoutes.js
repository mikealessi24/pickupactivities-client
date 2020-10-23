import React from "react";
import { Router } from "@reach/router";
import SignIn from "../../pages/PublicPages/SignIn";
import SignUp from "../../pages/PublicPages/SignUp";
import ConfirmSignUp from "../../pages/PublicPages/ConfirmSignUp";
import Landing from "../../pages/PublicPages/Landing";

export default function PublicRoutes({ setSignedIn }) {
  const [username, setUsername] = React.useState(undefined);
  const [password, setPassword] = React.useState(undefined);
  return (
    <div>
      <Router>
        <Landing path="/" />
        <SignIn path="signin" />
        <SignUp
          path="signup"
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <ConfirmSignUp path="confirm" />
      </Router>
    </div>
  );
}
