import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Header, Footer } from "./AuthenticatorComponents/HeaderFooter";
import { SignInHeader, SignInFooter } from "./AuthenticatorComponents/SignIn";
import { SignUpHeader, SignUpFooter } from "./AuthenticatorComponents/SignUp";
import { CSUHeader, CSUFooter } from "./AuthenticatorComponents/SignUpConfirm";
import { FormFields } from "./AuthenticatorComponents/FormFields";
import { FormFields_FNP } from "./AuthenticatorComponents/FormFields_FNP";
import { services } from "./AuthenticatorComponents/_services";

const AuthenticatorLR = (props) => {
  return (
    <Authenticator
      variation="default" // default or modal
      loginMechanisms={["email"]}
      signUpAttributes={["given_name", "family_name", "address"]}
      socialProviders={["google"]}
      //hideSignUp={true}
      initialState="signUp"
      //components={components}
      components={{
        Header,
        Footer,
        SignIn: { Header: SignInHeader, Footer: SignInFooter },
        SignUp: { Header: SignUpHeader, Footer: SignUpFooter, FormFields },
        ConfirmSignUp: { Header: CSUHeader, Footer: CSUFooter },
        ForceNewPassword: { FormFields: FormFields_FNP },
      }}
      services={services}
    >
      {({ signOut, user }) => (
        <header className="App-header">
          AMPLIFY UI DOCS <hr />
          <button onClick={signOut} style={{ backgroundColor: "grey" }}>
            SIGN OUT
          </button>
          <br></br> <br></br>
          {/************************************************************* */}
        </header>
      )}
    </Authenticator>
  );
};

export default AuthenticatorLR;
