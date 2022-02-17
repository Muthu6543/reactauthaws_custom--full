import React, { useState, useEffect } from "react";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";

const Home = (props) => {
  //   useEffect(() => {      });
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const usergroup = user.signInUserSession.idToken.payload["cognito:groups"];
  console.log(user, usergroup[0]);

  return (
    <>
      <div style={{ backgroundColor: "lightcoral" }}>
        HOME PAGE <hr />
        <h1>Hello 2, {user.username}</h1>
        <b>AWS ID: </b>
        {user.attributes.sub}
        <br />
        <b>Name: </b>
        {user.attributes.given_name}
        <br />
        <b>Surname: </b>
        {user.attributes.family_name}
        <br />
        <b>Email: </b>
        {user.attributes.email}
        <b>Gender: </b>
        {user.attributes.gender}
        <br />
        <button onClick={signOut}>LOGOUT</button>
        <Button onClick={signOut} style={{ backgroundColor: "grey" }}>
          SIGN OUT
        </Button>
        <hr></hr>
        <br></br>
      </div>
      <div style={{ backgroundColor: "lightcyan" }}>
        CHANGE PASSWORD <hr />
        <b>Email: </b>
        {user.attributes.email}
        <b>Gender: </b>
        {user.attributes.gender}
        <br />
        <button onClick={signOut}>LOGOUT</button>
        <hr></hr>
        <br></br>
      </div>
    </>
  );
};

export default Home;
