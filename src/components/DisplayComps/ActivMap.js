import React from "react";
import axios from "axios";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapStyle from "../DisplayComps/MapStyle";

//setting up the boiler plate googleMapApi connection
const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
// this could be the users location
// let latitude;
// let longitude;
// if (window.navigator.geolocation) {
//   window.navigator.geolocation.getCurrentPosition((resp) => {
//     latitude = resp.coords.latitude;
//     longitude = resp.coords.longitude;
//   });
// }

//add styles from snazzy maps
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: MapStyle,
};

export default function ActivMap({
  activities,
  selectedLoco,
  setSelectedLoco,
  infoAddress,
  setInfoAddress,
}) {
  // const [latitude, setLatitude] = React.useState(undefined);
  // const [longitude, setLongitude] = React.useState(undefined);

  async function highlight(id, lat, lng) {
    try {
      const resp = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      setInfoAddress(resp.data.results[0].formatted_address);
      setSelectedLoco(id);
    } catch (error) {
      console.log(error);
    }
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  // not getting my exact location, getting north charleston
  // if (window.navigator.geolocation) {
  //   window.navigator.geolocation.getCurrentPosition((resp) => {
  //     setLatitude(resp.coords.latitude);
  //     //   console.log(latitude);
  //     setLongitude(resp.coords.longitude);
  //     //   console.log(longitude);
  //   });
  // }

  const center = {
    lat: 32.786066,
    lng: -79.930923,
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13.5}
        center={center}
        options={options}
      >
        {activities.map((location) => {
          const lat = Number(location.latitude);
          const lng = Number(location.longitude);
          return (
            <>
              {selectedLoco === location.id ? (
                <>
                  <Marker
                    key={location.id}
                    position={{ lat, lng }}
                    icon={{
                      url: "/icon2.svg",
                    }}
                    onClick={() => highlight(location.id, lat, lng)}
                  >
                    <InfoWindow>
                      <div>
                        <h3>{location.title}</h3>
                        <p>{location.host}</p>
                        <p>{infoAddress}</p>
                      </div>
                    </InfoWindow>
                  </Marker>
                </>
              ) : (
                <>
                  <Marker
                    key={location.id}
                    position={{ lat, lng }}
                    icon={{
                      url: "/icon1.svg",
                    }}
                    onClick={() => highlight(location.id, lat, lng)}
                  />
                </>
              )}
            </>
          );
        })}
        <Marker
          position={{ lat: 32.776566, lng: -79.930923 }}
          icon={{
            url: "/CurrentLocationIcon.svg",
          }}
        />
      </GoogleMap>
    </>
  );
}
