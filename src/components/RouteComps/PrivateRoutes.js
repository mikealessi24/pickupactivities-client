import React from "react";
import { Router } from "@reach/router";
import Home from "../../pages/PrivatePages/Home";
import Explore from "../../pages/PrivatePages/Explore";
import Profile from "../../pages/PrivatePages/Profile";
import NotFound from "../../pages/PublicPages/NotFound";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  return (
    <Router>
      <Home path="/home" setSignedIn={setSignedIn} signedIn={signedIn} />
      <Explore path="/explore" signedIn={signedIn} />
      <Profile path="/profile" setSignedIn={setSignedIn} signedIn={signedIn} />
      <NotFound default />
    </Router>
  );
}
