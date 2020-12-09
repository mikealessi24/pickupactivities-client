import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import "../../style/master.css";
import "../../style/activity.css";
import { navigate } from "@reach/router";
import Activity from "../../components/DisplayComps/Activity";
import ActivMap from "../../components/DisplayComps/ActivMap";

export default function Explore({
  signedIn,
  setSelectedLoco,
  selectedLoco,
  setInfoAddress,
  infoAddress,
}) {
  const [activities, setActivities] = React.useState([]);
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post(
          "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/get-activities",
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
    <div className="horizontal-page">
      <div className="horizontal-header">
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("explore")}>Explore</Button>
        <Button onClick={() => navigate("/profile")}>Profile</Button>
      </div>
      <div className="horizontal-content">
        <div className="horizontal-left">
          {activities.map((activity) => {
            return (
              <>
                <Activity
                  activity={activity}
                  setIsClicked={setIsClicked}
                  isClicked={isClicked}
                  setSelectedLoco={setSelectedLoco}
                  signedIn={signedIn}
                  setInfoAddress={setInfoAddress}
                />
              </>
            );
          })}
        </div>
        <div className="horizontal-map">
          <ActivMap
            activities={activities}
            isClicked={isClicked}
            selectedLoco={selectedLoco}
            setSelectedLoco={setSelectedLoco}
            infoAddress={infoAddress}
            setInfoAddress={setInfoAddress}
          />
        </div>
      </div>
    </div>
  );
}
