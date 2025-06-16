import React, { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:3000/profile").then((response) => {
      console.log(response.data);
      setProfile(response.data);
      setUsername(response.data.username);
    });
  }, []);
  const handleSubmit = async (e) => {
    const newPic = image ? `src/assets/${image?.name}` : profile.profile_pic;

    e.preventDefault();
    try {
      await axios.put("http://localhost:3000/profile", {
        username: username,
        profile_pic: newPic,
      });
      setProfile({
      ...profile,
      username: username,
      profile_pic: newPic
    });
      alert("profile updated successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="m-5">
      {profile ? (
        <div>
          <img
            src={profile.profile_pic}
            alt=""
            className="profile rounded-circle"
          />
          <h5>{profile.username}</h5>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              name="username"
              className="form-control my-4 w-50"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              name="profile_pic"
              className="form-control w-50"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit" className="btn btn-primary my-4">
              Update
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Profile;
