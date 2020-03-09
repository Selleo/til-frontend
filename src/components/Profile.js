import React from "react";
import { useAuth0 } from "../OAuth";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.picture} alt="" />
    </div>
  );
};

export default Profile;
