import React from "react";
import "../../style/activity.css";
import axios from "axios";
import { navigate } from "@reach/router";
import FormatTime from "../../components/InputComps/FormatTime";
import FormatAddress from "../../components/InputComps/FormatAddress";
import SnackBarAlert from "../../components/DisplayComps/SnackBarAlert";
import AddIcon from "@material-ui/icons/Add";

export default function Activity({
  activity,
  setIsClicked,
  setSelectedLoco,
  signedIn,
  setInfoAddress,
}) {
  const [numJoined, setNumJoined] = React.useState(undefined);
  const [activityAvatar, setActivityAvatar] = React.useState(undefined);
  const [address, setAddress] = React.useState(undefined);

  const [status, setStatus] = React.useState(undefined);

  const renderDate = activity.date.split("-").reverse();

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const activityId = activity.id;
        const resp = await axios.post(
          "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/get-participant-count",
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
        const resp = await axios.post(
          "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/get-s3-pic",
          {
            token,
            user,
          }
        );
        setActivityAvatar(resp.data);
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

  function highlight(id) {
    setIsClicked(id);
    setSelectedLoco(id);
    setInfoAddress(address);
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
      const resp = await axios.post(
        "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/add-participant",
        {
          token,
          activityId,
          counter,
        }
      );
      console.log(resp);
      setStatus({
        message: `Successfully reserved ${counter} spots`,
        type: "success",
      });
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    } catch (error) {
      console.log(error);
      setStatus({
        message: `Cannot reserve ${count} spots`,
        type: "error",
      });
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
        {status && <SnackBarAlert status={status} setStatus={setStatus} />}
        <div className="activity-title">
          <h3>{activity.title}</h3>
          <div className="host-avatar">
            <img src={activityAvatar} alt="avatar" />
          </div>
        </div>
        <br></br>
        <div className="activity-content">
          <div className="text-header">
            <div style={{ fontSize: "20px" }}>
              {numJoined === null ? "0" : numJoined} /{" "}
              {activity.numParticipants}
            </div>
            <h4 className="host" onClick={() => getUserProfile(activity.host)}>
              @{activity.host}
            </h4>
          </div>
          <div className="text-when">
            <div>
              {renderDate[1]}/{renderDate[0]}/{renderDate[2]} at{" "}
              <FormatTime activity={activity} />
            </div>
          </div>
          <br></br>
          <div className="address">
            <FormatAddress activity={activity} />
          </div>
        </div>
        <br />
        <div className="quick-add">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              reserve(e.target.elements.counter.value);
            }}
          >
            <select
              style={{ position: "relative", bottom: "5px" }}
              name="counter"
              id="counter"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button
              style={{ border: "none", backgroundColor: "none" }}
              type="submit"
            >
              <AddIcon className="add-icon" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
