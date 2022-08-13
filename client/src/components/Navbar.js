import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "../components/LoginButton";
import { AuthenticationContext } from "../context/AuthenticationContext";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin } = useContext(AuthenticationContext);

  return (
    <Wrapper>
      <StyledLink to="/" end>
        <Logo>
          Balloons <br />
          Decorale
        </Logo>
      </StyledLink>
      <LinksWrapper>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/gallery">Gallery</StyledNavLink>
        {isAdmin && <StyledNavLink to="/events">Booked</StyledNavLink>}
      </LinksWrapper>
      <div>
        <UserContainer>
          {isAuthenticated ? (
            <>
              <UserImg src={`${user.picture}`} />
              <Username>{user.name}</Username>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </UserContainer>
      </div>
    </Wrapper>
  );
};

const UserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserContainer = styled.div`
  background-color: var(--lightpink);
  padding: 5px;
  border-radius: 5px;
  width: fit-content;
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 2em;
  font-weight: 900;
`;

const Username = styled.span`
  color: grey;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--darkpink);
  font-weight: 600;
  font-size: 1.1em;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--darkpink);
  font-weight: 600;
  font-size: 1.1em;
`;

const LinksWrapper = styled.div`
  position: absolute;
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  left: 50%;
  transform: translate(-50%);
`;

const Wrapper = styled.div`
  box-sizing: border-box;

  padding: 0 150px;
  height: 14vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Navbar;
