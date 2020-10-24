import React from "react";
import { Router } from "@reach/router";
import Home from "../../pages/PrivatePages/Home";

export default function PrivateRoutes({ signedIn }) {
  return (
    <Router>
      <Home path="/home" signedIn={signedIn} />
    </Router>
  );
}
