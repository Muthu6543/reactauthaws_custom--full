// https://ui.docs.amplify.aws/?platform=react
import "./App.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Home from "./Home";
import Login from "./Auth/Login";

function App() {
  const { route } = useAuthenticator((context) => [context.route]);
  console.log(route);
  return route === "authenticated" ? <Home /> : <Login />;
}

export default function AppWithProvider() {
  return (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  );
}
//export default App;
