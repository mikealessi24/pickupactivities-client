import React from "react";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import "../../style/horizontalLayout.css";

export default function Host() {
  return (
    <div className="container">
      <div className="header-horizontal">
        <Button onClick={() => navigate("/home")}>Home</Button>
        <Button onClick={() => navigate("explore")}>Explore</Button>
        <Button onClick={() => navigate("/profile")}>Profile</Button>
      </div>
      <div className="content">
        <div className="host-creator">
          <div className="activity">
            <h2>Activity</h2>
            <form className="act-form">
              <label>
                Title:
                <input type="text" />
              </label>
              <input type="date" />
              <input type="time" />
            </form>
          </div>
          <hr />
          <div className="location">
            <form>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
