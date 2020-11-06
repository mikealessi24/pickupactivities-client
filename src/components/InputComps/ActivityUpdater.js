import React from "react";
import AutoAddress from "../../components/InputComps/AutoAddress";
import axios from "axios";

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
    <form
      onSubmit={(e) => {
        updateActivity(e);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "80%",
        border: "1px solid red",
      }}
    >
      <input
        type="text"
        id="title"
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <textarea id="info" onChange={(e) => setEditInfo(e.target.value)} />
      <input
        type="number"
        id="numPar"
        onChange={(e) => setEditNumber(e.target.value)}
      />
      <input
        type="date"
        id="date"
        onChange={(e) => setEditDate(e.target.value)}
      />
      <input
        type="time"
        id="time"
        onChange={(e) => setEditTime(e.target.value)}
      />
      <AutoAddress setLat={setLat} setLong={setLong} />
      <label>Privacy</label>
      <label>
        Priavte
        <input
          type="radio"
          id="yes"
          name="option"
          value="yes"
          onChange={(e) => setEditPrivate(e.target.value)}
        />
      </label>
      <label>
        Public
        <input
          type="radio"
          id="no"
          name="option"
          value="no"
          onChange={(e) => setEditPrivate(e.target.value)}
        />
      </label>
      <button type="submit">update</button>
    </form>
  );
}
