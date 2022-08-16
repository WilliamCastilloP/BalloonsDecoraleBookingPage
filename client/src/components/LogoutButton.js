import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AuthenticationContext } from "../context/AuthenticationContext";

const LogoutButton = (props) => {
  const { logout } = useContext(AuthenticationContext);
  return (
    <Button className="btn" onClick={() => logout()}>
      <i className="fa-solid fa-arrow-right-to-bracket"></i> <span>Logout</span>
    </Button>
  );
};

const Button = styled.button`
  margin-left: 20px;
  border: 0;
  background-color: var(--pink);
  color: white;
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--darkpink);
  }

  span {
    margin-left: 5px;
  }

  @media (max-width: 1100px) {
    margin-left: 5px;
  }
`;

export default LogoutButton;
