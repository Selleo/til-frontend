import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import {
  saveAllCategories,
  saveCurrentUser,
  saveAllUsers,
  saveAllPosts,
} from "./store/actions/actions";
import AuthHandler from "./components/AuthHandler";
import AuthenticatedApp from "./authenticated";
import GlobalStyle from "./styles/GlobalStyle";
import NonAuthenticatedApp from "./nonAuthenticated";
import useUser from "./utils/customHooks/useUser";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useUser();

  useEffect(() => {
    dispatch(saveAllPosts());
    dispatch(saveCurrentUser());
    dispatch(saveAllCategories());
    dispatch(saveAllUsers());
  }, [dispatch]);

  const renderApp = currentUser ? (
    <AuthenticatedApp />
  ) : (
    <NonAuthenticatedApp />
  );

  return (
    <Router>
      <GlobalStyle />
      {renderApp}
      <Route path="/auth">
        <AuthHandler />
      </Route>
    </Router>
  );
};

export default App;
