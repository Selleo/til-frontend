import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import StyledAdminPanel from "../styles/StyledAdminPanel";
import useUser from "../utils/customHooks/useUser";
import chevron from "../assets/chevron.png";

const AdminPanel = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [backgroundClass, setBackgroundClass] = useState("");
  const [imgRotate, setImgRotate] = useState("");
  const user = useUser();

  const toggleDropdown = () => {
    setIsHidden(!isHidden);
    setBackgroundClass(backgroundClass === "bg-light" ? "" : "bg-light");
    setImgRotate(imgRotate === "img-rotate" ? "" : "img-rotate");
  };

  return (
    <StyledAdminPanel>
      <Link to="/add-post" className="add-post-btn">
        ADD POST
      </Link>
      <div className={`${backgroundClass} profile`} onClick={toggleDropdown}>
        <div className="user-info">
          <img src={user.image} alt="user-img" />
          <p>
            {user.firstName} {user.lastName}
          </p>
          <img src={chevron} alt="chevron" className={`${imgRotate} chevron`} />
        </div>
        <div
          className={`${
            isHidden ? "hidden" : ""
          } drop-down-menu ${backgroundClass}`}
        >
          <Link to="/profile" className="profile-link">
            Profile
          </Link>
          <Logout />
        </div>
      </div>
    </StyledAdminPanel>
  );
};

export default AdminPanel;
