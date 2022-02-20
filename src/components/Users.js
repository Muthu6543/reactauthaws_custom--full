import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Students from "./Students";
import Teachers from "./Teachers";

const Users = (props) => {
  //   user payload
  const { user, signOut } = useAuthenticator((context) => [context.user]); //console.log(user);

  // user groups
  const group = user.signInUserSession.idToken.payload["cognito:groups"][0];
  console.log("user-group:", group);

  if (group === "STUDENTS") return <Students user={user} signOut={signOut} />;
  if (group === "TEACHERS") return <Teachers user={user} signOut={signOut} />;
};

export default Users;
