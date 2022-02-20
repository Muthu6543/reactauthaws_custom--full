import React from "react";
import Profile from "./Profile";

const Teachers = (props) => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <h1 style={{ color: "white" }}>TEACHER DASHBOARD</h1>
      <hr></hr>
      <Profile user={props.user} signOut={props.signOut} />
    </div>
  );
};

export default Teachers;
