import React from "react";
import "../../style/master.css";
import "../../style/HomeActivity.css";
import HomeActivity from "../../components/DisplayComps/HomeActivity";
import axios from "axios";

import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";

export default function Home({ setSignedIn, signedIn, setSelectedLoco }) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [activities, setActivities] = React.useState([]);
  const [time, setTime] = React.useState("");
  const [followingList, setFollowingList] = React.useState([]);

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      setSignedIn(undefined);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const avatar = await axios.post("http://localhost:4000/get-s3-pic", {
          token,
        });
        console.log(avatar.data);
        setS3Avi(avatar.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post(
          "http://localhost:4000/get-following-activities",
          {
            token,
          }
        );
        setActivities(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post("http://localhost:4000/get-following", {
          token,
        });
        setFollowingList(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function getUserProfile(user) {
    navigate(`/view/${user}`);
  }

  return (
    <div className="main-page">
      <div className="header">
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
      <div className="main-container">
        <div className="left-container">
          <div className="left">
            <div className="avi-cont">
              <img src={s3Avi} alt="avatar image" />
            </div>
            <div className="user-actions">
              {/* could bring up all activities/games in any location */}
              <Button onClick={() => navigate("/home")}>Home</Button>
              <Button onClick={() => navigate("explore")}>Explore</Button>
              <Button onClick={() => navigate("/profile")}>Profile</Button>
              <div className="post-button">
                <Button onClick={() => navigate("/host-activity")}>
                  Host an activity
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="middle-container">
          <div className="middle">
            <div className="home-search">
              <input
                type="text"
                placeholder="Search for a pickup activity..."
              />
              <div>fileters that filter search and feed</div>
            </div>
            <div className="home-activity-container">
              {activities.map((activity) => (
                <HomeActivity
                  activity={activity}
                  signedIn={signedIn}
                  getUserProfile={getUserProfile}
                  setSelectedLoco={setSelectedLoco}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="right">
            <div className="view-following">
              <h3>following</h3>
              <div>
                {followingList.map((following) => (
                  <div onClick={() => getUserProfile(following.beingFollowed)}>
                    {following.beingFollowed}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
