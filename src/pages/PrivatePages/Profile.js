import React from "react";
import "../../style/master.css";
import axios from "axios";
import CompletedActiv from "../../components/DisplayComps/CompletedActiv";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";

import EditProfile from "../../components/InputComps/EditProfile";

export default function Profile({ setSignedIn, signedIn }) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [clicked, setClicked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(undefined);

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

  React.useEffect(() => {
    console.log("re-render");
    (async function () {
      try {
        console.log("getting user");
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/get-user", {
          token,
        });
        console.log("here is the response data", response.data);
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
              <div>
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

        {/* this could change from cards to a table , maybe? */}
        <div className="profilePage-middle">
          <CompletedActiv />
          <CompletedActiv />
          <CompletedActiv />
          <CompletedActiv />
          <CompletedActiv />
        </div>
      </div>
    </div>
  );
}
