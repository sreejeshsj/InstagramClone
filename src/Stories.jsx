import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Stories() {
  const [stories, setStories] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    fetch("http://localhost:3000/story")
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);
  const size=stories.length
  return (
    <div className="story d-flex">
      {size > 0 ? (
        stories.map((story, index) => (
          <div key={index} className="mx-2">
            <div className="gradient-border" onClick={()=>{navigate(`/story/${story.id}/${size}`)}}> 
              <img
                src={story.user.profile_pic}
                alt="dp"
                className="story-dp rounded-circle"
              />
            </div>

            <p className="text-truncate" style={{ width: "45px" }}>
              {story.user.username}
            </p>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Stories;
