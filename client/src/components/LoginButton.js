import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button onClick={() => loginWithRedirect()}>
      <span>Login</span>
      <i className="fa-solid fa-arrow-right-to-bracket"></i>
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
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    width: 40px;
    span {
      display: none;
    }
  }
`;

export default LoginButton;
