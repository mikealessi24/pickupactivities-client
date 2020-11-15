import React from "react";
import AutoAddress from "../../components/InputComps/AutoAddress";
import axios from "axios";
import { navigate } from "@reach/router";
import { Tooltip } from "@material-ui/core";
import "../../style/updatePage.css";

export default function ActivityCreator({
  setLat,
  setLong,
  lat,
  long,
  signedIn,
}) {
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
      console.log(time);

      await axios.post("http://localhost:4000/create-activity", {
        token,
        title,
        info,
        numParticipants,
        date,
        time,
        latitude,
        longitude,
      });
      window.alert("success");
      navigate("/home");
    } catch (error) {
      console.log(error);
      window.alert("something went wrong");
    }
  }

  return (
    <div className="createform-container">
      <form onSubmit={(e) => createActivity(e)} className="form">
        <div className="title-input">
          <input type="text" placeholder="Title..." id="title" />
          <AutoAddress setLat={setLat} setLong={setLong} />
        </div>

        <div className="date-input">
          <input type="date" id="date" />
        </div>
        <div className="time-input">
          <input type="time" id="time" />
        </div>
        <div className="participant-input">
          <Tooltip title="Number of participants needed" placement="top">
            <input type="number" placeholder="0" id="numPar" />
          </Tooltip>
        </div>

        <textarea id="info" rows="4" cols="50" />

        <button type="submit">click</button>
      </form>
    </div>
  );
}
