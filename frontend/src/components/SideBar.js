import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils";

const SideBar = props => {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <nav className="side-nav-bar">
      <ul className="side-nav-bar-list">
        {!isLoggedIn && (
          <li>
            <a href="http://localhost:4000/auth/google">login</a>
          </li>
        )}
        <li>
          <Link to="/">home</Link>
        </li>
        <li> search </li>
        <li>
          <Link to="/stats"> stats</Link>
        </li>
        <li>
          <Link to="/random-post"> random</Link>
        </li>
        <li>
          <Link to="/categories"> categories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
