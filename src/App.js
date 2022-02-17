// https://ui.docs.amplify.aws/?platform=react
import "./App.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Home from "./Home";
import AuthenticatorLR from "./Auth/AuthenticatorLR";

function App() {
  const { route } = useAuthenticator((context) => [context.route]);
  console.log(route);
  return route === "authenticated" ? <Home /> : <AuthenticatorLR />;
}

export default function AppWithProvider() {
  return (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  );
}
//export default App;
