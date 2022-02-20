import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";

const Profile = (props) => {
  //const { user, signOut } = props;
  const { signOut } = useAuthenticator((context) => [context.user]);
  const usr = useAuthenticator((context) => [context.user]).user;
  const [user, setUser] = useState(usr);

  // custom attribues
  const category = user.signInUserSession.idToken.payload["custom:category"];
  const schoolid = user.signInUserSession.idToken.payload["custom:schoolid"];
  const [email, setEmail] = useState(user.attributes.email);
  const [gender, setGender] = useState(user.attributes.gender);
  const [name, setName] = useState(user.attributes.given_name);
  const [surname, setSurname] = useState(user.attributes.family_name);
  const [schoolID, setSchoolID] = useState(schoolid);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e, keyName) => {
    let newValue = e.target.value;
    if (keyName === "email") setEmail(newValue);
    if (keyName === "gender") setGender(newValue);
    if (keyName === "name") setName(newValue);
    if (keyName === "surname") setSurname(newValue);
    if (keyName === "schoolid") setSchoolID(newValue);
    if (keyName === "oldPassword") setOldPassword(newValue);
    if (keyName === "newPassword") setNewPassword(newValue);
    if (keyName === "confirmPassword") setConfirmPassword(newValue);
  };

  /** SINGLE ATTRIBUTES */
  const updateEmail = async () => {
    try {
      let data = await Auth.updateUserAttributes(user, { email: email });
      console.log(data); // SUCCESS
      cognitoRefresh();
      //history.push("/confirm-register");
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateGender = async () => {
    try {
      let data = await Auth.updateUserAttributes(user, { gender: gender });
      console.log(data);
      cognitoRefresh();
    } catch (err) {
      console.log("error", err);
    }
  };

  /** MULTIPLE ATTRIBUTES */
  const updateUserAttr = async () => {
    try {
      // Auth.currentAuthenticatedUser({ bypassCache: true });
      let data = await Auth.updateUserAttributes(user, {
        given_name: name,
        family_name: surname,
        "custom:schoolid": schoolID,
      });
      console.log(data); // SUCCESS
      cognitoRefresh();
    } catch (err) {
      console.log("error", err);
    }
  };

  /** GET UPDATED ATTRIBUTES FROM COGNITO (COMPONENT DOM) */
  const cognitoRefresh = () => {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setUser(user)) // console.log(user))
      .catch((err) => console.log(err));
  };

  /** PASSWORD */
  const updateUserPassword = async (e) => {
    e.preventDefault();
    console.log("oldPassword:", oldPassword);
    console.log("newPass:", newPassword, "confirmPass:", confirmPassword);

    if (newPassword === confirmPassword && newPassword !== "") {
      console.log("passwords matched!");

      try {
        let data = await Auth.changePassword(user, oldPassword, newPassword);
        console.log(data); // SUCCESS
      } catch (err) {
        console.log("error", err);
      }
    } else {
      console.log("passwords didn't match!");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "lightcoral" }}>
        <h1>Hello, {user.username}</h1>
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
        <br />
        <b>Gender: </b>
        {user.attributes.gender}
        <br />
        <b>Category: </b>
        {category}
        <br />
        <b>School ID: </b>
        {schoolid}
        <br />
        <button onClick={signOut}>LOGOUT</button>
        <Button onClick={signOut} style={{ backgroundColor: "grey" }}>
          SIGN OUT
        </Button>
        <hr></hr>
        <br></br>
      </div>

      <div style={{ backgroundColor: "lightcyan" }}>
        CHANGE SINGLE ATTRIBUTE <hr />
        <table>
          <tr>
            <td>
              <b>Email: </b>
            </td>
            <td>
              <input
                value={email}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </td>
            <td>
              <button onClick={updateEmail}>SAVE</button>
            </td>
          </tr>
          <tr>
            <td>
              <b>Gender: </b>
            </td>
            <td>
              <input
                value={gender}
                onChange={(e) => handleInputChange(e, "gender")}
              />
            </td>
            <td>
              <button onClick={updateGender}>SAVE</button>
            </td>
          </tr>
        </table>
        <br></br>
      </div>

      <div style={{ backgroundColor: "lightblue" }}>
        CHANGE MULTIPLE ATTRIBUTES <hr />
        <table>
          <tr>
            <b>Name [given_name]: </b>
            <td>
              <input
                value={name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </td>
            <td>
              <b>Surname [family_name]: </b>
              <input
                value={surname}
                onChange={(e) => handleInputChange(e, "surname")}
              />
            </td>
            <tr>
              <b>Sch.ID: </b>
              <td>
                <input
                  value={schoolID}
                  onChange={(e) => handleInputChange(e, "schoolid")}
                />
              </td>
            </tr>
            <td>
              <button onClick={updateUserAttr}>SAVE CHANGES</button>
            </td>
          </tr>
        </table>
        <br></br>
      </div>

      <div style={{ backgroundColor: "lightgoldenrodyellow" }}>
        CHANGE PASSWORD <hr />
        <table>
          <tr>
            <td>
              <b>Current Password: </b>
            </td>
          </tr>
          <tr>
            <td>
              <input
                value={oldPassword}
                onChange={(e) => handleInputChange(e, "oldPassword")}
                //type="password"
                placeholder="enter your current password"
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>New Password: </b>
            </td>
          </tr>
          <tr>
            <td>
              <input
                value={newPassword}
                onChange={(e) => handleInputChange(e, "newPassword")}
                //type="password"
                placeholder="enter a new password"
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Confirm New Password: </b>
            </td>
          </tr>
          <tr>
            <td>
              <input
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, "confirmPassword")}
                //type="password"
                placeholder="enter the new password again"
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={(e) => updateUserPassword(e)}>
                UPDATE PASSWORD
              </button>
            </td>
          </tr>
        </table>
        <br></br>
      </div>
    </>
  );
};

export default Profile;
