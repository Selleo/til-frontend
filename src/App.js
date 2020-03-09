import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import AddPost from "./components/AddPost";
import Login from "./components/Login";
import Markdown from "./components/Markdown";
import Posts from "./components/Posts";

function App() {
  return (
    <Router>
      <Markdown />
      <main className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Posts</Link>
            </li>
            <li>
              <Link to="/add-post">Add post</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/add-post">
            <AddPost />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
