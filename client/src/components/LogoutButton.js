import React from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

const LogoutButton = (props) => {
  const { logout } = useContext(AuthenticationContext);
  return <button onClick={() => logout()}>Log out</button>;
};

export default LogoutButton;
