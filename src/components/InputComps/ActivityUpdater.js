import React from "react";
import AutoAddress from "../../components/InputComps/AutoAddress";
import axios from "axios";
import "../../style/updatePage.css";
import { Tooltip } from "@material-ui/core";

export default function ActivityUpdater({
  setLat,
  setLong,
  setEditTitle,
  setEditInfo,
  setEditNumber,
  setEditDate,
  setEditTime,
  setEditPrivate,
  updateActivity,
}) {
  return (
    <div className="updateform-container">
      <form
        onSubmit={(e) => {
          updateActivity(e);
        }}
        className="form"
      >
        <div className="title-input">
          <input
            type="text"
            placeholder="Title..."
            id="title"
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <AutoAddress setLat={setLat} setLong={setLong} />
        </div>

        <div className="date-input">
          <input
            type="date"
            id="date"
            onChange={(e) => setEditDate(e.target.value)}
          />
        </div>
        <div className="time-input">
          <input
            type="time"
            id="time"
            onChange={(e) => setEditTime(e.target.value)}
          />
        </div>
        <div className="participant-input">
          <Tooltip title="Number of participants needed" placement="top">
            <input
              type="number"
              placeholder="0"
              id="numPar"
              onChange={(e) => setEditNumber(e.target.value)}
            />
          </Tooltip>
        </div>

        <textarea
          id="info"
          rows="4"
          cols="50"
          onChange={(e) => setEditInfo(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
