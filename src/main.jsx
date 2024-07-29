import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
//reudx

import { Provider } from "react-redux";
import Store from "./store/store.js";

//kinde
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <KindeProvider
    clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}
    domain={import.meta.env.VITE_REACT_APP_DOMAIN}
    redirectUri={import.meta.env.VITE_REACT_APP_REDIRECT_URL}
    logoutUri={import.meta.env.VITE_REACT_APP_LOGOUT_URL}
  >
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </KindeProvider>
);
