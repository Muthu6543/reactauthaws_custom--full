// https://ui.docs.amplify.aws/?platform=react
import "./App.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Users from "./components/Users";
import AuthenticatorLR from "./Auth/AuthenticatorLR";

function App() {
  const { route } = useAuthenticator((context) => [context.route]);
  console.log("<route>: ", route);
  // isLoggedIn > router user to dashboard
  // isNotLoggedIn > route user to authenticator to login or signup..
  return route === "authenticated" ? <Users /> : <AuthenticatorLR />;
}

export default function AppWithProvider() {
  return (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  );
}
//export default App;
