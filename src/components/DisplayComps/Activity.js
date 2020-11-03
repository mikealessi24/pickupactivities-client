import React from "react";
import "../../style/activity.css";
import axios from "axios";

export default function Activity({ activity }) {
  // React.useEffect(() => {
  //   (async function () {
  //     try {
  //       const resp = axios.get(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${activity.latitude},${activity.longitude}=${process.env.REACT_APP_GOOGLE_API_KEY}`
  //       );
  //       console.log(resp);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // need to do reverse geocoding to get a better location

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
          <div>
            {activity.latitude} {activity.longitude}
          </div>
        </div>
        <div className="host-avatar">
          <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
        </div>
      </div>
    </div>
  );
}
