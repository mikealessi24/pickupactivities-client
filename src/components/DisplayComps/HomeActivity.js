import React from "react";
import "../../style/HomeActivity.css";
import axios from "axios";
import { navigate } from "@reach/router";
import FormatTime from "../../components/InputComps/FormatTime";
import { Tooltip } from "@material-ui/core";
export default function HomeActivity({
  activity,
  signedIn,
  getUserProfile,
  setSelectedLoco,
  setInfoAddress,
}) {
  const [activityAvatar, setActivityAvatar] = React.useState(undefined);
  const [numJoined, setNumJoined] = React.useState(undefined);
  const [reservedClicked, setReservedClicked] = React.useState(undefined);

  const renderDate = activity.date.split("-").reverse();
  const [address, setAddress] = React.useState(undefined);

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

    (async function () {
      try {
        const lat = Number(activity.latitude);
        const lng = Number(activity.longitude);
        const resp = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );
        setAddress(resp.data.results[0].formatted_address);
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
      alert(`${count} spots reserved`);
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
    setInfoAddress(address);
    navigate("/explore");
  }

  return (
    <div className="home-activity">
      <div className="home-activity-body">
        <div className="home-activity-header">
          <h2 className="home-title">{activity.title}</h2>
          <div className="home-header-avatar">
            <img src={activityAvatar} alt="avatar" />
          </div>
        </div>
        <div className="home-activity-content">
          <div className="activity-when-where">
            <h4
              className="host-display"
              onClick={() => getUserProfile(activity.host)}
            >
              @{activity.host}
            </h4>
            <Tooltip title="Number of Participants needed" placement="left">
              <div style={{ fontSize: "20px" }}>
                <span
                  role="img"
                  aria-label="person"
                  style={{ fontSize: "25px" }}
                >
                  👥
                </span>{" "}
                {numJoined === null ? "0" : numJoined} /{" "}
                {activity.numParticipants}
              </div>
            </Tooltip>
            <br></br>
            <br></br>
            <div style={{ fontSize: "15px" }}>
              {" "}
              <span role="img" aria-label="person" style={{ fontSize: "25px" }}>
                📍
              </span>{" "}
              {address}
            </div>
            <br></br>
            <div>
              {renderDate[1]}/{renderDate[0]}/{renderDate[2]}
            </div>
            <br></br>
            <div>
              <FormatTime activity={activity} />
            </div>
            <br></br>
          </div>
          <div className="home-activity-info">
            <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
              Extra Info
            </div>
            <p>{activity.info}</p>
          </div>
        </div>
        {activity.host === signedIn.username ? (
          <div className="home-activity-actions">
            {!reservedClicked ? (
              <>
                {/* <button onClick={() => editAct()}>edit</button>
            <button onClick={() => deleteAct()}>delete</button> */}
                <div className="view-more">
                  <img src="/viewMore.png" />
                  {/* going to open popover */}
                </div>
                <button
                  onClick={() => {
                    setReservedClicked(true);
                  }}
                >
                  Reserve a spot
                </button>{" "}
                <button onClick={() => view()}>view</button>
              </>
            ) : (
              <div className="reserver">
                How many spots would you like to reserve?
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
                  <button type="submit">Reserve</button>
                  <button onClick={() => setReservedClicked(undefined)}>
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="home-activity-actions">
            {!reservedClicked ? (
              <>
                {" "}
                <div
                  className="add-participants-icon"
                  onClick={() => {
                    setReservedClicked(true);
                  }}
                >
                  <img src="/addUser.png" alt="add participants" />
                </div>{" "}
                <button onClick={() => view()}>view</button>{" "}
              </>
            ) : (
              <div className="reserver">
                How many spots would you like to reserve?
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
                  <button type="submit">Reserve</button>
                  <button onClick={() => setReservedClicked(undefined)}>
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
