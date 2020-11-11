import React from "react";
import { Router } from "@reach/router";
import Home from "../../pages/PrivatePages/Home";
import Explore from "../../pages/PrivatePages/Explore";
import Profile from "../../pages/PrivatePages/Profile";
import NotFound from "../../pages/PublicPages/NotFound";
import Host from "../../pages/PrivatePages/Host";
import Edit from "../../pages/PrivatePages/Edit";
import ViewOtherProfile from "../../pages/PrivatePages/ViewOtherProfile";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  const [selectedLoco, setSelectedLoco] = React.useState(undefined);
  const [infoAddress, setInfoAddress] = React.useState(undefined);
  return (
    <Router>
      <Home
        path="/home"
        setSignedIn={setSignedIn}
        signedIn={signedIn}
        setSelectedLoco={setSelectedLoco}
        setInfoAddress={setInfoAddress}
      />
      <Explore
        path="/explore"
        signedIn={signedIn}
        setSelectedLoco={setSelectedLoco}
        selectedLoco={selectedLoco}
        setInfoAddress={setInfoAddress}
        infoAddress={infoAddress}
      />
      <Profile path="/profile" setSignedIn={setSignedIn} signedIn={signedIn} />
      <NotFound default />
      <Host path="/host-activity" signedIn={signedIn} />
      <Edit path="/edit/:selected" signedIn={signedIn} />
      <ViewOtherProfile path="/view/:user" signedIn={signedIn} />
    </Router>
  );
}
