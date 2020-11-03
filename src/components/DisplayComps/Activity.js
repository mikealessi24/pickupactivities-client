import React from "react";
import "../../style/activity.css";
import axios from "axios";

export default function Activity({
  activity,
  setIsClicked,
  isClicked,
  setSelectedLoco,
}) {
  // need to do reverse geocoding to get a better location

  function highlight(id) {
    setIsClicked(true);
    setSelectedLoco(id);
  }

  function unHighlight() {
    setIsClicked(false);
    setSelectedLoco(undefined);
  }

  return (
    <>
      {!isClicked ? (
        <div
          onClick={() => {
            highlight(activity.id);
          }}
          className="activity-container"
        >
          <div className="activity-title">
            <h3>{activity.title}</h3>
            <button>reserve</button>
          </div>
          <div className="activity-content">
            <div className="text-header">
              <div>Host: {activity.host}</div>
              <div>numGoing / {activity.numParticipants}</div>
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
        <div className="expanded-activity-cont" onClick={() => unHighlight()}>
          <div className="activity-title">
            <h3>{activity.title}</h3>
            <button>reserve</button>
          </div>
          <div className="activity-content">
            <div className="text-header">
              <div>Host: {activity.host}</div>
              <div>numGoing / {activity.numParticipants}</div>
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
          <div className="extra-info">
            <div className="extra-info-header">
              <div className="host-avatar">
                <img src="https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png" />
              </div>
              <button>look</button>
            </div>
            <div className="info">
              <p>{activity.info}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
