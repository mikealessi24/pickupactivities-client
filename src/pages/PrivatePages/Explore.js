import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import "../../style/exploreLayout.css";
import { navigate } from "@reach/router";
import Activity from "../../components/DisplayComps/Activity";
import ActivMap from "../../components/DisplayComps/ActivMap";

export default function Explore({ signedIn }) {
  const [activities, setActivities] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post(
          "http://localhost:4000/get-activities",
          {
            token,
          }
        );
        setActivities(response.data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div className="explore-container">
      <div className="ex-header">
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("explore")}>Explore</Button>
        <Button onClick={() => navigate("/profile")}>Profile</Button>
      </div>
      <div className="ex-content">
        <div className="ex-left">
          {activities.map((activity) => {
            return <Activity activity={activity} />;
          })}
        </div>
        <div className="ex-map">
          <ActivMap activities={activities} />
        </div>
      </div>
    </div>
  );
}
