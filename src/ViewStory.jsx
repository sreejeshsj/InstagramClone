import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
Link;
function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
      .then((response) => response.json())
      .then((data) => setStory(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (id > tot || id < 1) {
    navigate("/");
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
      {story ? (
        <div>
          <Link to={`http://localhost:5173/story/${Number(id) - 1}/${tot}`}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>
          <img src={story.image} alt="story" className="vh-100 " />
          <Link to={`http://localhost:5173/story/${Number(id) + 1}/${tot}`}>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </Link>
          <p>{story.id}</p>
        </div>
      ) : (
        <div>loading</div>
      )}{" "}
    </div>
  );
}

export default ViewStory;
