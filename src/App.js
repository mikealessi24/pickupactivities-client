import React from "react";
import awsconfig from "./aws-exports";
import PrivateRoutes from "./components/RouteComps/PrivateRoutes";
import PublicRoutes from "./components/RouteComps/PublicRoutes";
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";
Amplify.configure(awsconfig);

function App() {
  const [signedIn, setSignedIn] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setSignedIn(user);
      } catch (error) {
        setSignedIn(undefined);
        console.log("use effect log", error);
      }
    })();
  }, []);

  return (
    <div>
      {signedIn ? (
        <PrivateRoutes signedIn={signedIn} />
      ) : (
        <PublicRoutes setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;
