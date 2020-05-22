import React from "react";

export const ProfileTimeline = ({ resource }) => {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li style={{ listStyle: "none" }} key={post.id}>
          {post.text}
        </li>
      ))}
    </ul>
  );
};
