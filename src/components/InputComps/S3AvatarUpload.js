import React from "react";
import uuid from "uuid/dist/v4";
import { Storage } from "aws-amplify";
import axios from "axios";

export default function S3AvatarUpload({ signedIn }) {
  const [filename, setFilename] = React.useState(undefined);

  function updateStorage() {
    console.log(filename);
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/avatar/${myUuid}.png`, filename, {
      contentType: "image/png",
    })
      .then((result) => {
        console.log(result);
        updateDatabase(result.key);
        window.alert("avatar updated");
      })
      .catch((err) => console.log(err));
  }

  async function updateDatabase(avatarpath) {
    console.log("in");
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await axios.put("http://localhost:4000/update-avatar", {
        token,
        avatar: avatarpath,
      });
      console.log("success", resp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <label for="image">{filename ? filename.name : "Choose Avatar"}</label>
      <input
        style={{ display: "none" }}
        id="image"
        name="image"
        type="file"
        accept="image/png"
        onChange={(e) => setFilename(e.target.files[0])}
      />
      <button
        onClick={() => {
          updateStorage();
        }}
      >
        upload
      </button>
    </div>
  );
}
