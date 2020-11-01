import React from "react";
import "../../style/activity.css";

export default function Activity({ activity }) {
  return (
    <div className="activity-container">
      <div className="activity-title">
        <h3>{activity.title}</h3>
      </div>

      <div className="activity-content">
        <div className="activity-text">
          <div>{activity.host}</div>
          <div>{activity.time}</div>
          <div>{activity.date}</div>
          <div>location</div>
        </div>
        <div className="host-avatar">
          <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
        </div>
      </div>
    </div>
  );
}
