import React from "react";
import { Link } from "react-router-dom";
import AdminPanel from "../authenticated/AdminPanel";
import Search from "./Search";
import StyledAppHeader from "../styles/StyledAppHeader";
import useUser from "../utils/customHooks/useUser";

const AppHeader = (props) => {
  const user = useUser();

  return (
    <StyledAppHeader>
      <ul>
        <li>
          <Link to="/" className="home">
            todayilearned
          </Link>
        </li>
        <li>
          <Search />
        </li>
        {user ? (
          <AdminPanel />
        ) : (
          <li>
            <a href="http://localhost:4000/auth/google">login</a>
          </li>
        )}
      </ul>
    </StyledAppHeader>
  );
};

export default AppHeader;
