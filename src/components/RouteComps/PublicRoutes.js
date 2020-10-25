import React from "react";
import { Router } from "@reach/router";
import SignIn from "../../pages/PublicPages/SignIn";
import SignUp from "../../pages/PublicPages/SignUp";
import ConfirmSignUp from "../../pages/PublicPages/ConfirmSignUp";
import Landing from "../../pages/PublicPages/Landing";
import NotFound from "../../pages/PublicPages/NotFound";

export default function PublicRoutes({ setSignedIn }) {
  const [username, setUsername] = React.useState(undefined);
  const [password, setPassword] = React.useState(undefined);
  return (
    <div>
      <Router>
        <Landing path="/" />
        <SignIn path="signin" setSignedIn={setSignedIn} />
        <SignUp
          path="signup"
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <ConfirmSignUp
          path="confirm"
          setSignedIn={setSignedIn}
          username={username}
          password={password}
        />
        <NotFound default />
      </Router>
    </div>
  );
}
