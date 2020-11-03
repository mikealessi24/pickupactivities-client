import React from "react";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import axios from "axios";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Host({ signedIn }) {
  const [lat, setLat] = React.useState(undefined);
  const [long, setLong] = React.useState(undefined);

  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  if (loadError) return "Error loading";
  if (!isLoaded) return "Loading";

  async function createActivity(e) {
    try {
      e.preventDefault();
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const title = e.target.elements.title.value;
      const info = e.target.elements.info.value;
      const numParticipants = e.target.elements.numPar.value;
      const date = e.target.elements.date.value;
      const time = e.target.elements.time.value;
      const latitude = lat;
      const longitude = long;
      const privacy = e.target.elements.option.value;

      const resp = await axios.post("http://localhost:4000/create-activity", {
        token,
        title,
        info,
        numParticipants,
        date,
        time,
        latitude,
        longitude,
        private: privacy,
      });
      window.alert("success");
    } catch (error) {
      console.log(error);
      window.alert("something went wrong");
    }
  }

  return (
    <div className="explore-container">
      <div className="ex-header">
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("explore")}>Explore</Button>
        <Button onClick={() => navigate("/profile")}>Profile</Button>
      </div>
      <form
        onSubmit={(e) => createActivity(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid red",
        }}
      >
        <input type="text" id="title" />
        <textarea id="info" />
        <input type="number" id="numPar" />
        <input type="date" id="date" />
        <input type="time" id="time" />
        <AddressSearch setLat={setLat} setLong={setLong} />
        <label>Privacy</label>
        <label>
          Priavte
          <input type="radio" id="yes" name="option" value="yes" />
        </label>
        <label>
          Public
          <input type="radio" id="no" name="option" value="no" />
        </label>

        <button type="submit">click</button>
      </form>
    </div>
  );
}

function AddressSearch({ setLat, setLong }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 32.776566, lng: () => -79.930923 },
      radius: 100,
    },
  });

  return (
    <Combobox
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setLat(lat);
          setLong(lng);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter activity address"
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
      </ComboboxPopover>
    </Combobox>
  );
}
