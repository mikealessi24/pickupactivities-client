import React from "react";
import awsconfig from "./aws-exports";
import PrivateRoutes from "./components/RouteComps/PrivateRoutes";
import PublicRoutes from "./components/RouteComps/PublicRoutes";
import Amplify from "aws-amplify";
Amplify.configure(awsconfig);

function App() {
  const [signedIn, setSignedIn] = React.useState(undefined);
  return (
    <div>
      <PrivateRoutes />
      <PublicRoutes setSignedIn={setSignedIn} />
    </div>
  );
}

export default App;
