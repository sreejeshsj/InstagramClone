import axios from "axios";
import React, { useEffect, useState } from "react";

function Suggestion() {
  const [profile, setProfile] = useState(null);
  const [suggestion, setSuggestion] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/profile")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/suggestions")
      .then((response) => response.json())
      .then((data) => setSuggestion(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFollow=async (id,username)=>{
    
    await axios.post('http://localhost:3000/Followers',{'id':id,'username':username})
    alert(`Followed ${username}`)
  }
  return (
    <div>
      <div className="suggestions w-75 m-4">
        {profile ? (
          <div className="d-flex">
            <img
              className="dp rounded-circle"
              src={profile.profile_pic}
              alt="Profile-pic"
            />
            <h5>{profile.username}</h5>
            <small className="ms-auto text-primary">Switch</small>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="d-flex">
          <p>Suggested for you</p>
          <b className="ms-auto">See All</b>
        </div>

        {suggestion.length > 0 ? (
          <div>
            {suggestion.map((suggestion, index) => (
              <div  key={index}>
                <div className="d-flex">
                  <img 
                    className="dp rounded-circle"
                    src={suggestion.profile_pic}
                    alt="Profile-pic"
                  />
                  <h5>{suggestion.username}</h5>
                  <a style={{ textDecoration: 'none' }}
                 onClick={()=>handleFollow(suggestion.id,suggestion.username)} className="text-primary ms-auto">Follow</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>loading posts</div>
        )}
      </div>
    </div>
  );
}

export default Suggestion;
