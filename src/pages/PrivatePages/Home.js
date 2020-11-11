import React from "react";
import "../../style/master.css";
import "../../style/HomeActivity.css";
import HomeActivity from "../../components/DisplayComps/HomeActivity";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";

export default function Home({
  setSignedIn,
  signedIn,
  setSelectedLoco,
  setInfoAddress,
}) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [activities, setActivities] = React.useState([]);
  const [followingList, setFollowingList] = React.useState([]);
  const [activityFilter, setActivityFilter] = React.useState("following");
  const [search, setSearch] = React.useState(undefined);

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
      const route =
        activityFilter === "following"
          ? "http://localhost:4000/get-following-activities"
          : "http://localhost:4000/get-activities";
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post(route, {
          token,
        });
        console.log(resp.data);
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
  }, [activityFilter]);

  function getUserProfile(user) {
    navigate(`/view/${user}`);
  }

  async function searchActivities(e) {
    if (e.key === "Enter") {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post("http://localhost:4000/search", {
          token,
          search,
        });
        resp.data[0]
          ? setActivities(resp.data)
          : alert("No results, try another search");
      } catch (error) {
        console.log(error);
      }
    }
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
        <hr style={{ width: "1px", backgroundColor: "black" }}></hr>
        <div className="middle-container">
          <div className="middle">
            <br></br>
            <div className="home-search-container">
              <div className="home-search">
                <input
                  type="text"
                  placeholder="Search for a pickup activity..."
                  onKeyPress={(e) => searchActivities(e)}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div
                onClick={() => setActivityFilter("following")}
                className={
                  activityFilter === "following"
                    ? "follow-filter-underline"
                    : "follow-filter"
                }
              >
                Following
              </div>
              <div
                onClick={() => setActivityFilter("all")}
                className={
                  activityFilter === "all"
                    ? "all-filter-underline"
                    : "all-filter"
                }
              >
                All
              </div>
            </div>
            <br></br>
            <hr
              style={{ width: "97%", height: "1px", backgroundColor: "black" }}
            ></hr>
            <br></br>
            <div className="home-activity-container">
              {activities.map((activity) => (
                <HomeActivity
                  activity={activity}
                  signedIn={signedIn}
                  getUserProfile={getUserProfile}
                  setSelectedLoco={setSelectedLoco}
                  setInfoAddress={setInfoAddress}
                />
              ))}
            </div>
          </div>
        </div>
        <hr style={{ width: "1px", backgroundColor: "black" }}></hr>
        <div className="right-container">
          <div className="right">
            <div className="view-following">
              <h3 style={{ fontSize: "22px" }}>
                <img src="/addressBook.png" /> Following
              </h3>
              <div style={{ width: "100%" }}>
                {followingList.map((following) => (
                  <>
                    <hr style={{ width: "95%" }}></hr>
                    <div
                      style={{ marginLeft: "10px" }}
                      onClick={() => getUserProfile(following.beingFollowed)}
                    >
                      @{following.beingFollowed}
                    </div>
                    <hr style={{ width: "95%" }}></hr>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
