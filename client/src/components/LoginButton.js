import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button onClick={() => loginWithRedirect()}>
      <i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Login</span>
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
    margin-left: 5px;
  }
`;

export default LoginButton;
