import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "./OAuth";
import "./index.css";
import history from "./utils/history";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { domain, client_id, redirect } from "./auth_config";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    client_id={client_id}
    redirect_uri={redirect}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
