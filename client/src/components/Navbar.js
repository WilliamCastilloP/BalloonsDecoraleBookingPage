import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "../components/LoginButton";
import { AuthenticationContext } from "../context/AuthenticationContext";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";

const Navbar = () => {
  const { user, isAuthenticated } = useContext(AuthenticationContext);
  console.log(user);
  return (
    <Wrapper>
      <Link to="/">Logo</Link>
      <LinksWrapper>
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/booking">Booking</Link>
      </LinksWrapper>
      <div>
        {isAuthenticated ? (
          <>
            <span>{user.name}</span>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </Wrapper>
  );
};

const LinksWrapper = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid red;
  padding: 10px;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Navbar;
