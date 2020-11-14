import React from "react";
import "../../style/master.css";
import axios from "axios";
import ActivityTable from "../../components/DisplayComps/ActivityTable";
import { Button } from "@material-ui/core/";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

import EditProfile from "../../components/InputComps/EditProfile";
import { findAllByTestId } from "@testing-library/react";

export default function Profile({ setSignedIn, signedIn }) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [clicked, setClicked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [selected, setSelected] = React.useState([]);
  const [filterClicked, setFilterClicked] = React.useState(false);
  const [filter, setFilter] = React.useState("host");

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      setSignedIn(undefined);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  function expandEdit() {
    setClicked(true);
  }

  async function deleteAct() {
    window.confirm("are you sure you want to delete this activity?");
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const activityId = selected;
      const resp = await axios.post(
        "http://localhost:4000/delete-active-post",
        {
          token,
          activityId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  function editAct() {
    navigate(`/edit/${selected}`);
  }

  React.useEffect(() => {
    (async function () {
      try {
        console.log("getting user");
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/get-user", {
          token,
        });
        setCurrentUser(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const avatar = await axios.post("http://localhost:4000/get-s3-pic", {
          token,
        });
        setS3Avi(avatar.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="main-page">
      <div className="header">
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
      <div className="main-container">
        {!clicked ? (
          <div className="left-container">
            <div className="left">
              <div className="avi-cont">
                <img src={s3Avi} alt="avatar" />
              </div>
              <div className="about-user">
                {currentUser && currentUser.firstname}{" "}
                {currentUser && currentUser.lastname}
              </div>
              <div>{currentUser && currentUser.about}</div>
              <div className="user-actions">
                {/* could bring up all activities/games in any location */}
                <Button onClick={() => navigate("/home")}>Home</Button>
                <Button onClick={() => navigate("explore")}>Explore</Button>
                <Button onClick={() => expandEdit()}>Edit Profile</Button>
                <div className="post-button">
                  <Button>Host an Activity</Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-left-move">
            <EditProfile
              signedIn={signedIn}
              setClicked={setClicked}
              s3Avi={s3Avi}
            />
          </div>
        )}
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
                  <h4 onClick={() => setFilter("host")}>Hosting</h4>
                  <h4 onClick={() => setFilter("participant")}>
                    Participating
                  </h4>
                  <div
                    className="arrow"
                    onClick={() => setFilterClicked(false)}
                  >
                    <ArrowLeftIcon style={{ fontSize: "20px" }} />
                  </div>
                </div>
              )}

              <div className="activity-actions">
                <button onClick={() => deleteAct()}>delete</button>
                <button onClick={() => editAct()}>edit</button>
                <button>reserve</button>
              </div>
            </div>

            <ActivityTable
              signedIn={signedIn}
              setSelected={setSelected}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
