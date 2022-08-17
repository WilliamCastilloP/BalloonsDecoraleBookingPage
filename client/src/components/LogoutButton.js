import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AuthenticationContext } from "../context/AuthenticationContext";

const LogoutButton = (props) => {
  const { logout } = useContext(AuthenticationContext);
  return (
    <Button className="btn" onClick={() => logout()}>
      <span>Logout</span> <i className="fa-solid fa-arrow-right-to-bracket"></i>
    </Button>
  );
};

const Button = styled.button`
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
    margin-right: 6px;
  }

  @media (max-width: 1350px) {
    margin-left: 10px;
  }

  @media (max-width: 600px) {
    width: 40px;
    span {
      display: none;
    }
  }
`;

export default LogoutButton;
