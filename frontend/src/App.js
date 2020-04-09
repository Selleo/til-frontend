import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AuthHandler from "./components/AuthHandler";
import AuthenticatedApp from "./authenticated";
import NonAuthenticatedApp from "./nonAuthenticated";
import {
  saveAllCategories,
  saveCurrentUser,
  saveAllUsers,
  saveAllPosts,
} from "./store/actions/actions";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

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
<<<<<<< HEAD
    <Router>
      {renderApp}
      <Route path="/auth">
        <AuthHandler />
      </Route>
    </Router>
=======
    <div data-testid="app-main">
      <Router>
        {renderApp}
        <Route path="/auth">
          <AuthHandler setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Router>
    </div>
>>>>>>> test: redux actions
  );
};

export default App;
