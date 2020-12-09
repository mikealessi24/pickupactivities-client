import React from "react";
import "../../style/master.css";
import "../../style/button.css";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ActivityTable from "../../components/DisplayComps/ActivityTable";
import { Button, Tooltip, useRadioGroup } from "@material-ui/core";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";
import Profile from "../../pages/PrivatePages/Profile";

export default function ViewOtherProfile({ setSignedIn, signedIn, user }) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [selected, setSelected] = React.useState(undefined);
  const [isFollowed, setIsFollowed] = React.useState(undefined);
  const [filterClicked, setFilterClicked] = React.useState(false);
  const [filter, setFilter] = React.useState("host");
  const [reserver, setReserver] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(undefined);

  // reserve function and view function with selected

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post(
          "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/get-other-user",
          {
            token,
            user,
          }
        );
        console.log("DATA FOR USER", resp.data);
        setUserInfo(resp.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const avatar = await axios.post(
          "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/get-s3-pic",
          {
            token,
            user,
          }
        );
        setS3Avi(avatar.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const following = await axios.post(
          "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/get-following",
          {
            token,
          }
        );
        const followed = following.data.map((el) => el.beingFollowed);
        const checkFollowed = followed.includes(user);
        setIsFollowed(checkFollowed);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function follow() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await axios.post(
        "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/follow",
        {
          token,
          user,
        }
      );
      console.log(resp);
      setIsFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollow() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await axios.post(
        "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/unfollow",
        {
          token,
          user,
        }
      );
      console.log(resp);
      setIsFollowed(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function reserve(count) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const activityId = selected;
      const counter = count;
      const resp = await axios.post(
        "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/add-participant",
        {
          token,
          activityId,
          counter,
        }
      );
      console.log(resp);
      alert(`${count} spots reserved`);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      alert(`cannot reserve ${count} spots`);
    }
  }

  return (
    <>
      {user !== signedIn.username ? (
        <div className="main-page">
          <div className="horizontal-header">
            <Button onClick={() => navigate("/home")}>Home</Button>
            <Button onClick={() => navigate("explore")}>Explore</Button>
            <Button onClick={() => navigate("/profile")}>Profile</Button>
          </div>
          <div className="horizontal-content">
            <div className="left-container">
              <div className="left">
                <div className="avi-cont">
                  <img src={s3Avi} alt="avatar" />
                </div>
                <div className="about-user">
                  <div className="about-name">
                    <h4>
                      {userInfo && userInfo.firstname}{" "}
                      {userInfo && userInfo.lastname}
                    </h4>
                  </div>
                  <div className="about-info">
                    <p style={{ fontSize: "14px" }}>
                      {userInfo && userInfo.about}
                    </p>
                  </div>
                </div>
                <div className="user-actions">
                  {!isFollowed ? (
                    <div className="follow-button">
                      <Button onClick={() => follow()}>Follow</Button>
                    </div>
                  ) : (
                    <Tooltip title="unfollow this user" position="top">
                      <div className="post-button">
                        <Button onClick={() => unfollow()}>Following</Button>
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
            <hr style={{ width: "1px", backgroundColor: "black" }}></hr>
            <div className="profilePage-middle">
              <div className="table-container">
                <div className="table-header">
                  {!filterClicked ? (
                    <div className="icon-cont">
                      <div
                        className="filter-icon"
                        onClick={() => setFilterClicked(true)}
                      >
                        <FilterListIcon style={{ fontSize: "35px" }} />
                      </div>
                    </div>
                  ) : (
                    <div className="table-filters">
                      {filter === "host" ? (
                        <>
                          <h4
                            onClick={() => setFilter("host")}
                            className="current-filter"
                          >
                            Host
                          </h4>
                          <h4
                            onClick={() => setFilter("participant")}
                            className="table-filter"
                          >
                            Participant
                          </h4>{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <h4
                            onClick={() => setFilter("host")}
                            className="table-filter"
                          >
                            Host
                          </h4>
                          <h4
                            onClick={() => setFilter("participant")}
                            className="current-filter"
                          >
                            Participant
                          </h4>{" "}
                        </>
                      )}

                      <div
                        className="arrow"
                        onClick={() => setFilterClicked(false)}
                      >
                        <ArrowLeftIcon style={{ fontSize: "20px" }} />
                      </div>
                    </div>
                  )}
                  {selected ? (
                    <>
                      {reserver === false ? (
                        <>
                          <div className="otherProfile-actions">
                            <div className="add-partic">
                              <Tooltip title="Add participants" position="top">
                                <img
                                  src="/addUser.png"
                                  alt="add participants"
                                  onClick={() => setReserver(true)}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="profile-reserver">
                            How many spots would you like to reserve?
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                reserve(e.target.elements.counter.value);
                              }}
                            >
                              <select name="counter" id="counter">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <button type="submit">Reserve</button>
                              <button onClick={() => setReserver(false)}>
                                Cancel
                              </button>
                            </form>
                          </div>
                        </>
                      )}{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <ActivityTable
                  signedIn={signedIn}
                  setSelected={setSelected}
                  filter={filter}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Profile signedIn={signedIn} />
      )}
    </>
  );
}
