import React from "react";
import "../../style/activity.css";
import axios from "axios";

export default function Activity({
  activity,
  setIsClicked,
  isClicked,
  setSelectedLoco,
  signedIn,
}) {
  // need to do reverse geocoding to get a better location
  const [numJoined, setNumJoined] = React.useState(undefined);

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
  }, []);

  function highlight(id) {
    setIsClicked(true);
    setSelectedLoco(id);
  }

  function unHighlight() {
    setIsClicked(false);
    setSelectedLoco(undefined);
  }

  async function reserve(count) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const activityId = activity.id;
      const counter = count;
      alert(counter);
      const resp = await axios.post("http://localhost:4000/add-participant", {
        token,
        activityId,
        counter,
      });
      console.log(resp);
      alert("success");
    } catch (error) {
      console.log(error);
      alert("not working");
    }
  }

  return (
    <>
      {!isClicked ? (
        <div className="activity-container">
          <div className="activity-title">
            <h3>{activity.title}</h3>
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
          <div
            onClick={() => {
              highlight(activity.id);
            }}
            className="activity-content"
          >
            <div className="text-header">
              <div>Host: {activity.host}</div>
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
        </div>
      ) : (
        <div className="expanded-activity-cont">
          <div className="activity-title">
            <h3>{activity.title}</h3>
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
          <div className="activity-content" onClick={() => unHighlight()}>
            <div className="text-header">
              <div>Host: {activity.host}</div>
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
          <div className="extra-info" onClick={() => unHighlight()}>
            <div className="info">
              <p>{activity.info}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
