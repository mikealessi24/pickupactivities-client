import React from "react";
import "../../style/HomeActivity.css";
import axios from "axios";
import FormatTime from "../../components/InputComps/FormatTime";
import { Tooltip } from "@material-ui/core";
import FormatAddress from "../InputComps/FormatAddress";

export default function EditorActivity({
  signedIn,
  originalAct,
  editTitle,
  editInfo,
  editDate,
  editNumber,
  editTime,
  lat,
  long,
}) {
  const activity = originalAct;
  console.log("here is the activity", originalAct);

  const [activityAvatar, setActivityAvatar] = React.useState(undefined);
  const [numJoined, setNumJoined] = React.useState(undefined);

  const activDate = editDate ? editDate : activity.date;
  const renderDate = activDate.split("-").reverse();

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

  return (
    <div className="home-activity">
      <div className="home-activity-body">
        <div className="home-activity-header">
          <h2 className="home-title">
            {editTitle ? editTitle : activity.title}
          </h2>
          <div className="home-header-avatar">
            <img src={activityAvatar} alt="avatar" />
          </div>
        </div>
        <div className="home-activity-content">
          <div className="activity-when-where">
            <h4 className="host-display">@{activity.host}</h4>
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
                {editNumber ? editNumber : activity.numParticipants}
              </div>
            </Tooltip>
            <br></br>
            <br></br>
            <div style={{ fontSize: "15px" }}>
              {" "}
              <span role="img" aria-label="person" style={{ fontSize: "25px" }}>
                📍
              </span>{" "}
              {lat && long ? (
                <div>
                  <FormatAddress
                    activity={{ latitude: lat, longitude: long }}
                  />
                </div>
              ) : (
                <FormatAddress activity={activity} />
              )}
            </div>
            <br></br>
            <div>
              {renderDate[1]}/{renderDate[0]}/{renderDate[2]}
            </div>
            <br></br>
            <div>
              {editTime ? (
                <FormatTime activity={{ time: editTime }} />
              ) : (
                <FormatTime activity={activity} />
              )}
            </div>
            <br></br>
          </div>
          <div className="home-activity-info">
            <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
              Extra Info
            </div>
            <p>{editInfo ? editInfo : activity.info}</p>
          </div>
        </div>
        <div className="home-activity-actions">
          <div className="view-more">
            <img src="/viewMore.png" />
          </div>
          <button>Reserve a spot</button>
          <button>view</button>
        </div>
      </div>
    </div>
  );
}
