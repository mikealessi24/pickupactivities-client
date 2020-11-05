import React from "react";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import "../../style/master.css";
import "../../style/updatePage.css";
import ActivityUpdater from "../../components/InputComps/ActivityUpdater";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";

export default function Edit({ signedIn, selected }) {
  const [lat, setLat] = React.useState(undefined);
  const [long, setLong] = React.useState(undefined);
  const [originalAct, setOriginalAct] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const activityId = selected;
        const resp = await axios.post(
          "http://localhost:4000/get-specific-activity",
          {
            token,
            activityId,
          }
        );
        setOriginalAct(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading";
  if (!isLoaded) return "Loading";

  return (
    <div className="horizontal-page">
      <div className="horizontal-header">
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("explore")}>Explore</Button>
        <Button onClick={() => navigate("/profile")}>Profile</Button>
      </div>
      <div className="update-viewer-container">
        <div className="update-viewer">
          <div className="viewer-header">
            <h3>{originalAct && originalAct.title}</h3>
          </div>
        </div>
        <div className="editor">
          <ActivityUpdater
            setLat={setLat}
            setLong={setLong}
            lat={lat}
            long={long}
            signedIn={signedIn}
            originalAct={originalAct}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
}
