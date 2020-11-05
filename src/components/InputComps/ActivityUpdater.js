import React from "react";
import AutoAddress from "../../components/InputComps/AutoAddress";
import axios from "axios";

export default function ActivityUpdater({
  setLat,
  setLong,
  lat,
  long,
  signedIn,
  selected,
  originalAct,
}) {
  async function updateActivity(e) {
    // try {
    //   e.preventDefault();
    //   const token = signedIn.signInUserSession.idToken.jwtToken;
    //   const title = e.target.elements.title.value;
    //   const info = e.target.elements.info.value;
    //   const numParticipants = e.target.elements.numPar.value;
    //   const date = e.target.elements.date.value;
    //   const time = e.target.elements.time.value;
    //   const latitude = lat;
    //   const longitude = long;
    //   const privacy = e.target.elements.option.value;
    //   const resp = await axios.post("http://localhost:4000/create-activity", {
    //     token,
    //     title,
    //     info,
    //     numParticipants,
    //     date,
    //     time,
    //     latitude,
    //     longitude,
    //     private: privacy,
    //   });
    //   window.alert("success");
    // } catch (error) {
    //   console.log(error);
    //   window.alert("something went wrong");
    // }
  }

  return (
    <form
      onSubmit={(e) => updateActivity(e)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "80%",
        border: "1px solid red",
      }}
    >
      <input type="text" id="title" />
      <textarea id="info" />
      <input type="number" id="numPar" />
      <input type="date" id="date" />
      <input type="time" id="time" />
      <AutoAddress setLat={setLat} setLong={setLong} />
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
  );
}
