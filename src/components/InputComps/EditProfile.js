import React from "react";
import { Button } from "@material-ui/core";
import S3AvatarUpload from "../../components/InputComps/S3AvatarUpload";
import axios from "axios";
import "../../style/master.css";
import SnackBarAlert from "../../components/DisplayComps/SnackBarAlert";

export default function EditProfile({ signedIn, setClicked, s3Avi }) {
  const [status, setStatus] = React.useState(undefined);

  async function saveChanges(e) {
    try {
      e.preventDefault();
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const firstname = e.target.elements.first.value;
      const lastname = e.target.elements.last.value;
      const about = e.target.elements.about.value;
      const resp = await axios.post(
        "https://cdp1j6hon6.execute-api.us-east-1.amazonaws.com/dev/update-user",
        {
          token,
          firstname,
          lastname,
          about,
        }
      );
      console.log(resp);

      setClicked(false);
      setStatus({
        message: `Successfully updated profile`,
        type: "success",
      });
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="avi-cont">
        <img src={s3Avi} alt="avatar" />
      </div>

      <div className="profile-editor-container">
        <form onSubmit={(e) => saveChanges(e)}>
          <div classname="actions">
            <label>
              Firstname: <input id="first" type="text" />
            </label>
          </div>
          <div classname="actions">
            <label>
              Lastname: <input id="last" type="text" />
            </label>
          </div>
          <div classname="actions">
            <label>
              <textarea
                id="about"
                rows="3"
                cols="30"
                placeholder="about me..."
              />
            </label>
          </div>
          <S3AvatarUpload signedIn={signedIn} />

          <Button type="submit">Save Profile</Button>
          <Button onClick={() => setClicked(false)}>Cancel</Button>
        </form>
        {status && <SnackBarAlert status={status} setStatus={setStatus} />}
      </div>
    </>
  );
}
