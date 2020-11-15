import React from "react";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import "../../style/master.css";
import "../../style/updatePage.css";
import ActivityUpdater from "../../components/InputComps/ActivityUpdater";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import EditorActivity from "../../components/DisplayComps/EditorActivity";

export default function Edit({ signedIn, selected }) {
  const [lat, setLat] = React.useState(undefined);
  const [long, setLong] = React.useState(undefined);
  const [originalAct, setOriginalAct] = React.useState(undefined);

  const [editTitle, setEditTitle] = React.useState(undefined);
  const [editInfo, setEditInfo] = React.useState(undefined);
  const [editNumber, setEditNumber] = React.useState(undefined);
  const [editDate, setEditDate] = React.useState(undefined);
  const [editTime, setEditTime] = React.useState(undefined);
  const [editPrivate, setEditPrivate] = React.useState(undefined);

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
        console.log("this is the original act", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function updateActivity(e) {
    e.preventDefault();
    const token = signedIn.signInUserSession.idToken.jwtToken;
    const activityId = selected;
    const title = editTitle ? editTitle : originalAct.title;
    const numParticipants = editNumber
      ? editNumber
      : originalAct.numParticipants;
    const info = editInfo ? editInfo : originalAct.info;
    const date = editDate ? editDate : originalAct.date;
    const time = editTime ? editTime : originalAct.time;
    const latitude = lat ? lat : originalAct.latitude;
    const longitude = long ? long : originalAct.longitude;
    const privacy = editPrivate ? editPrivate : originalAct.private;

    try {
      const resp = await axios.post(
        "http://localhost:4000/update-active-post",
        {
          token,
          activityId,
          title,
          info,
          numParticipants,
          date,
          time,
          latitude,
          longitude,
          private: privacy,
        }
      );
      alert("activity updated");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

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
      <div className="edit-container">
        <div className="edit-display">
          {originalAct && (
            <EditorActivity
              signedIn={signedIn}
              originalAct={originalAct}
              editTitle={editTitle}
              editInfo={editInfo}
              editDate={editDate}
              editNumber={editNumber}
              editTime={editTime}
              lat={lat}
              long={long}
            />
          )}
        </div>

        <div className="editor">
          <ActivityUpdater
            setLat={setLat}
            setLong={setLong}
            setEditTitle={setEditTitle}
            setEditNumber={setEditNumber}
            setEditDate={setEditDate}
            setEditTime={setEditTime}
            setEditInfo={setEditInfo}
            setEditPrivate={setEditPrivate}
            updateActivity={updateActivity}
          />
        </div>
      </div>
    </div>
  );
}
