import React from "react";
import "../../style/master.css";
import axios from "axios";
import ActivityTable from "../../components/DisplayComps/ActivityTable";
import { Button } from "@material-ui/core/";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import SnackBarAlert from "../../components/DisplayComps/SnackBarAlert";
import EditProfile from "../../components/InputComps/EditProfile";

export default function Profile({ setSignedIn, signedIn }) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [clicked, setClicked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [selected, setSelected] = React.useState(undefined);
  const [filterClicked, setFilterClicked] = React.useState(false);
  const [filter, setFilter] = React.useState("host");
  const [reserver, setReserver] = React.useState(false);
  const [status, setStatus] = React.useState(undefined);

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
      setStatus({ message: "Successfully deleted activity", type: "success" });
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  function editAct() {
    navigate(`/edit/${selected}`);
  }

  async function reserve(count) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const activityId = selected;
      const counter = count;
      const resp = await axios.post("http://localhost:4000/add-participant", {
        token,
        activityId,
        counter,
      });
      setStatus({
        message: `Successfully reserved ${count} spots`,
        type: "success",
      });
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    } catch (error) {
      console.log(error);
      setStatus({
        message: `Cannot reserve ${count} spots`,
        type: "error",
      });
    }
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
      {status && <SnackBarAlert status={status} setStatus={setStatus} />}
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
                <div className="about-name">
                  <h4>
                    {currentUser && currentUser.firstname}{" "}
                    {currentUser && currentUser.lastname}
                  </h4>
                </div>
                <div className="about-info">
                  <p style={{ fontSize: "14px" }}>
                    {currentUser && currentUser.about}
                  </p>
                </div>
              </div>

              <div className="user-actions">
                <Button onClick={() => navigate("/home")}>Home</Button>
                <Button onClick={() => navigate("explore")}>Explore</Button>
                <Button onClick={() => expandEdit()}>Edit Profile</Button>
                <div className="post-button">
                  <Button onClick={() => navigate("/host-activity")}>
                    Host an Activity
                  </Button>
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
                  {filter === "host" ? (
                    <>
                      <h4
                        onClick={() => setFilter("host")}
                        className="current-filter"
                      >
                        Hosting
                      </h4>
                      <h4
                        onClick={() => setFilter("participant")}
                        className="table-filter"
                      >
                        Participating
                      </h4>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <h4
                        onClick={() => setFilter("host")}
                        className="table-filter"
                      >
                        Hosting
                      </h4>
                      <h4
                        onClick={() => setFilter("participant")}
                        className="current-filter"
                      >
                        Participating
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
                  {" "}
                  {reserver === false ? (
                    <>
                      <div className="activity-actions">
                        <div className="add-partic">
                          <Tooltip title="Add participants" position="top">
                            <img
                              src="/addUser.png"
                              alt="add participants"
                              onClick={() => setReserver(true)}
                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Button onClick={() => editAct()}>
                            <EditIcon />
                            Edit
                          </Button>
                        </div>
                        <div>
                          <Button onClick={() => deleteAct()}>
                            <DeleteIcon />
                            Delete
                          </Button>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
