import React from "react";
import "../../style/homeLayout.css";

export default function Home({ signedIn }) {
  return (
    <div className="home-page">
      <div className="header">top of page</div>
      <div className="home-container">
        <div className="home-left">left side nav, will expand on hover</div>
        <div className="home-content">bulk content</div>
        <div className="home-right">logo top right</div>
      </div>
    </div>
  );
}
