import React from "react";
import "../../style/homeLayout.css";

import axios from "axios";
import Activity from "../../components/DisplayComps/Activity";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { Auth } from "aws-amplify";
import MyModal from "../../components/DisplayComps/MyModal";

export default function Home({ setSignedIn, signedIn }) {
  const [s3Avi, setS3Avi] = React.useState("");
  const [followerActiv, setFollowerActiv] = React.useState([]);
  const [time, setTime] = React.useState("");

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
    console.log("in");
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
    <div className="home-page">
      <div className="header">
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
      <div className="home-container">
        <div className="home-left-card">
          <div className="home-left">
            <div className="avi-cont">
              <img src={s3Avi} alt="avatar" />
            </div>
            <div className="user-actions">
              {/* could bring up all activities/games in any location */}
              <Button onClick={() => navigate("/home")}>Home</Button>
              <Button onClick={() => navigate("explore")}>Explore</Button>
              <Button onClick={() => navigate("/profile")}>Profile</Button>
              <div className="post-button">
                <Button onClick={() => navigate("/host-activity")}>
                  Host an Activity
                </Button>
                {/* need to decide on modal or new page */}
                {/* <MyModal /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="home-content"></div>
        <div className="home-right">something needs to go here</div>
      </div>
    </div>
  );
}
