import React from "react";
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
let latitude;
let longitude;
if (window.navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition((resp) => {
    latitude = resp.coords.latitude;
    longitude = resp.coords.longitude;
  });
}

//add styles from snazzy maps
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: MapStyle,
};

export default function ActivMap({ activities }) {
  const [latitude, setLatitude] = React.useState(undefined);
  const [longitude, setLongitude] = React.useState(undefined);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  // not getting my exact location, getting north charleston
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition((resp) => {
      setLatitude(resp.coords.latitude);
      //   console.log(latitude);
      setLongitude(resp.coords.longitude);
      //   console.log(longitude);
    });
  }

  const center = {
    lat: 32.776566,
    lng: -79.930923,
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
      >
        {activities.map((location) => {
          const lat = Number(location.latitude);
          const lng = Number(location.longitude);
          return <Marker key={location.id} position={{ lat, lng }} />;
        })}
        <Marker position={{ lat: 32.776566, lng: -79.930923 }} />
      </GoogleMap>
    </>
  );
}