import React from "react";
import { useDispatch } from "react-redux";
import { deleteToken } from "../utils";
import { deleteCurrentUser } from "../store/actions/actions";

const Logout = props => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(deleteCurrentUser());
    deleteToken();
  };

  return <button onClick={logOut}>log out</button>;
};

export default Logout;
