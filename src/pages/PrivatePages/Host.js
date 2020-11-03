import React from "react";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import "../../style/master.css";
import ActivityCreator from "../../components/InputComps/ActivityCreator";
import { useLoadScript } from "@react-google-maps/api";

export default function Host({ signedIn }) {
  const [lat, setLat] = React.useState(undefined);
  const [long, setLong] = React.useState(undefined);

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
      <ActivityCreator
        setLat={setLat}
        setLong={setLong}
        lat={lat}
        long={long}
        signedIn={signedIn}
      />
    </div>
  );
}
