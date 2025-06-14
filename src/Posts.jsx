import React, { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, [posts]);

  return (
    <div className="d-flex justify-content-center">
      {posts.length >0  ? (
        
        <div>
          {posts.map((post,index)=>(
            <div className="my-3" key={index}>
              <div className="d-flex">
                <img className="dp rounded-circle" src={post.user.profile_pic} alt="Profile-pic" />
                <h5>{post.user.username}</h5>

              </div>
              <img className="image" src={post.image} alt="post" />
              <div>
                <i className="bi bi-heart"></i>
                <i className="bi bi-chat"></i>
                <i className="bi bi-send"></i>
              </div>
              <div>
                <b>{post.likes} likes</b>
              </div>
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      ): <div>loading posts</div>}
    </div>
  );
}

export default Posts;
