import React from "react";
import "../../style/activity.css";
import axios from "axios";
import { navigate } from "@reach/router";

export default function Activity({
  activity,
  setIsClicked,
  setSelectedLoco,
  signedIn,
}) {
  // need to do reverse geocoding to get a better location
  const [numJoined, setNumJoined] = React.useState(undefined);
  const [activityAvatar, setActivityAvatar] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const activityId = activity.id;
        const resp = await axios.post(
          "http://localhost:4000/get-participant-count",
          {
            token,
            activityId,
          }
        );
        setNumJoined(resp.data[0].numJoined);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      const user = activity.host;
      const token = signedIn.signInUserSession.idToken.jwtToken;
      try {
        const resp = await axios.post("http://localhost:4000/get-s3-pic", {
          token,
          user,
        });
        setActivityAvatar(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function highlight(id) {
    setIsClicked(id);
    setSelectedLoco(id);
  }

  function unHighlight() {
    setIsClicked(undefined);
    setSelectedLoco(undefined);
  }

  async function reserve(count) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const activityId = activity.id;
      const counter = count;
      const resp = await axios.post("http://localhost:4000/add-participant", {
        token,
        activityId,
        counter,
      });
      console.log(resp);
      alert("spot reserved");
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      alert(`cannot reserve ${count} spots`);
    }
  }

  function getUserProfile(user) {
    navigate(`/view/${user}`);
  }

  return (
    <>
      <div
        className="activity-container"
        onMouseOver={() => {
          highlight(activity.id);
        }}
        onMouseLeave={() => unHighlight(activity.id)}
      >
        <div className="activity-title">
          <h3>{activity.title}</h3>
          <div className="host-avatar">
            <img src={activityAvatar} alt="avatar" />
          </div>
        </div>
        <br></br>
        <div className="activity-content">
          <div className="text-header">
            <div className="host" onClick={() => getUserProfile(activity.host)}>
              Host: {activity.host}
            </div>
            <div>
              {numJoined === null ? "0" : numJoined} /{" "}
              {activity.numParticipants}
            </div>
          </div>
          <div className="text-when">
            <div>
              When: {activity.date} at {activity.time}
            </div>
          </div>
          <div className="address">
            Where: {activity.latitude} {activity.longitude}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            reserve(e.target.elements.counter.value);
          }}
        >
          <select name="counter" id="counter">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit">reserve</button>
        </form>
      </div>
    </>
  );
}
