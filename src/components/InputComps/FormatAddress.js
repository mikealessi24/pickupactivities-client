import React from "react";
import axios from "axios";

export default function FormatAddress({ activity }) {
  const [address, setAddress] = React.useState();

  React.useEffect(() => {
    (async function () {
      try {
        console.log("sent to format address", activity);
        const lat = Number(activity.latitude);
        const lng = Number(activity.longitude);
        const resp = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );
        console.log(resp.data.results[0].formatted_address);
        setAddress(resp.data.results[0].formatted_address);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [activity.latitude && activity.longitude]);
  return <>{address}</>;
}
