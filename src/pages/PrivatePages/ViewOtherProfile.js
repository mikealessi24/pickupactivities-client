import React from "react";
import "../../style/master.css";
import axios from "axios";

import ActivityTable from "../../components/DisplayComps/ActivityTable";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";
import Profile from "../../pages/PrivatePages/Profile";

export default function ViewOtherProfile({ setSignedIn, signedIn, user }) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [isFollowed, setIsFollowed] = React.useState(undefined);

  // reserve function and view function with selected

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const resp = await axios.post("http://localhost:4000/get-other-user", {
          token,
          user,
        });
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const avatar = await axios.post("http://localhost:4000/get-s3-pic", {
          token,
          user,
        });
        setS3Avi(avatar.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const following = await axios.post(
          "http://localhost:4000/get-following",
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
      const resp = await axios.post("http://localhost:4000/follow", {
        token,
        user,
      });
      console.log(resp);
      setIsFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollow() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await axios.post("http://localhost:4000/unfollow", {
        token,
        user,
      });
      console.log(resp);
      setIsFollowed(false);
    } catch (error) {
      console.log(error);
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
                  {user && user.firstname} {user && user.lastname}
                </div>
                <div>{user && user.about}</div>
                <div className="user-actions">
                  {!isFollowed ? (
                    <Button onClick={() => follow()}>Follow</Button>
                  ) : (
                    <Button onClick={() => unfollow()}>unfollow</Button>
                  )}
                </div>
              </div>
            </div>
            <div className="profilePage-middle">
              <div className="table-container">
                <div className="table-header">
                  <div className="activity-actions">
                    <button>reserve</button>
                  </div>
                </div>
                <ActivityTable
                  signedIn={signedIn}
                  setSelected={setSelected}
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
