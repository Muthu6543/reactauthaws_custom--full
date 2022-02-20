import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Students from "./Students";
import Teachers from "./Teachers";

const Users = (props) => {
  //   user payload
  const { user, signOut } = useAuthenticator((context) => [context.user]); //console.log(user);

  // user groups
  const usergroup = user.signInUserSession.idToken.payload["cognito:groups"];
  console.log("user-group:", usergroup[0]);

  if (usergroup[0] === "STUDENTS")
    return <Students user={user} signOut={signOut} />;
  if (usergroup[0] === "TEACHERS")
    return <Teachers user={user} signOut={signOut} />;
};

export default Users;
