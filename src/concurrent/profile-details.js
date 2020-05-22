import React from "react";

export const ProfileDetails = ({ resource }) => {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
};
