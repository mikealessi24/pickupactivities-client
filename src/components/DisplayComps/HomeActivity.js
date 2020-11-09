import React from "react";
import "../../style/HomeActivity.css";
import axios from "axios";
import { navigate } from "@reach/router";
import ViewOtherProfile from "../../pages/PrivatePages/ViewOtherProfile";

export default function HomeActivity({
  activity,
  signedIn,
  getUserProfile,
  setSelectedLoco,
}) {
  const [activityAvatar, setActivityAvatar] = React.useState(undefined);
  const [numJoined, setNumJoined] = React.useState(undefined);
  React.useEffect(() => {
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

  async function deleteAct() {
    window.confirm("are you sure you want to delete this activity?");
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const activityId = activity.id;
      const resp = await axios.post(
        "http://localhost:4000/delete-active-post",
        {
          token,
          activityId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  function editAct() {
    navigate(`/edit/${activity.id}`);
  }

  function view() {
    setSelectedLoco(activity.id);
    navigate("/explore");
  }

  return (
    <div className="home-activity">
      <div className="home-activity-body">
        <div className="home-activity-header">
          <h2>{activity.title}</h2>
          <div className="home-header-avatar">
            <img src={activityAvatar} alt="avatar" />
          </div>
        </div>
        <div className="home-activity-content">
          <div className="activity-when-where">
            <div onClick={() => getUserProfile(activity.host)}>
              {activity.host}
            </div>
            <br></br>
            <div>
              {numJoined === null ? "0" : numJoined} /{" "}
              {activity.numParticipants} participants needed
            </div>
            <br></br>
            <div>{activity.date}</div>
            <div>{activity.time}</div>
            <div>
              {activity.latitude} {activity.longitude}
            </div>
          </div>
          <div className="home-activity-info">
            <p>{activity.info}</p>
          </div>
        </div>
        {activity.host === signedIn.username ? (
          <div className="home-activity-actions">
            <button onClick={() => editAct()}>edit</button>
            <button onClick={() => deleteAct()}>delete</button>
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
            <button onClick={() => view()}>view</button>
          </div>
        ) : (
          <div className="home-activity-actions">
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
            <button onClick={() => view()}>view</button>
          </div>
        )}
      </div>
    </div>
  );
}
