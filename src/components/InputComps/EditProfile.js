import React from "react";
import { Button } from "@material-ui/core";
import S3AvatarUpload from "../../components/InputComps/S3AvatarUpload";
import axios from "axios";
import "../../style/master.css";

export default function EditProfile({ signedIn, setClicked, s3Avi }) {
  async function saveChanges(e) {
    try {
      e.preventDefault();
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const firstname = e.target.elements.first.value;
      const lastname = e.target.elements.last.value;
      const about = e.target.elements.about.value;
      const resp = await axios.post("http://localhost:4000/update-user", {
        token,
        firstname,
        lastname,
        about,
      });
      console.log(resp);
      setClicked(false);
      setTimeout(function () {
        window.location.reload(true);
      }, 2005);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="avi-cont">
        <img src={s3Avi} alt="avatar" />
      </div>

      <div className="profile-editor">
        <form onSubmit={(e) => saveChanges(e)}>
          <label>
            Firstname: <input id="first" type="text" />
          </label>
          <label>
            Lastname: <input id="last" type="text" />
          </label>
          <label>
            About:
            <textarea id="about" />
          </label>
          <S3AvatarUpload signedIn={signedIn} />

          <Button type="submit">Save Profile</Button>
          <Button onClick={() => setClicked(false)}>Cancel</Button>
        </form>
      </div>
    </>
  );
}
