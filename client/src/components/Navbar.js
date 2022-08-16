import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "../components/LoginButton";
import { AuthenticationContext } from "../context/AuthenticationContext";
import LogoutButton from "./LogoutButton";
import { useContext, useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin } = useContext(AuthenticationContext);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Wrapper>
      <StyledLink to="/">
        <Logo>
          <LogoImg src="https://res.cloudinary.com/dpr59qtfp/image/upload/v1660498094/balloons%20decolare%20gallery/Peachpuff_Brush_Stroke_Photography_Logo_y3dvfd.png" />
        </Logo>
      </StyledLink>
      <LinksWrapper className="links-wrapper">
        <Burger className="burger" onClick={() => setIsClicked(!isClicked)}>
          <i className={isClicked ? "fa-solid fa-x" : "fa-solid fa-bars"}></i>
        </Burger>
        <LinksDiv
          className={isClicked ? "links-div-active" : "links-div-hidden"}
        >
          <StyledNavLink onClick={() => setIsClicked(false)} to="/">
            Home
          </StyledNavLink>
          <StyledNavLink onClick={() => setIsClicked(false)} to="/gallery">
            Gallery
          </StyledNavLink>
          {isAdmin ? (
            <StyledNavLink onClick={() => setIsClicked(false)} to="/events">
              Booked Decorations
            </StyledNavLink>
          ) : (
            isAuthenticated && (
              <StyledNavLink
                onClick={() => setIsClicked(false)}
                to="/booked-decoration"
              >
                Currently booked
              </StyledNavLink>
            )
          )}
        </LinksDiv>
      </LinksWrapper>
      <div>
        <UserContainer>
          {isAuthenticated ? (
            <>
              <UserImg src={`${user?.picture}`} />
              <Username className="user-name">{user.name}</Username>
              <LogoutButton />
            </>
          ) : (
            <LoginButton className="login-button" />
          )}
        </UserContainer>
      </div>
    </Wrapper>
  );
};

const LinksDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Burger = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  background-color: transparent;
  font-size: large;
  color: var(--pink);

  &:hover {
    background-color: var(--lightpink);
  }
`;

const LogoImg = styled.img`
  width: 120px;
  height: 100px;
`;

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
  color: var(--pink);
  font-weight: 600;
  font-size: 1.1em;
  width: fit-content;
  text-align: center;
  padding: 10px;

  &:hover {
    color: var(--darkpink);
    background-color: var(--lightpink);
    border-radius: 20px;
  }
`;

const LinksWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  height: 50px;
`;

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 0 10%;
  height: 14vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1300px) {
    .user-name {
      display: none;
    }
  }
  @media screen and (max-width: 1170px) {
    .links-div-hidden {
      position: absolute;
      top: 93px;
      left: -500%;
      transform: translate(-50%);
      flex-direction: column;
      background-color: white;
      width: 99vw;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      transition: all 200ms ease-in-out;
    }

    .links-div-active {
      position: absolute;
      top: 93px;
      left: 50%;
      transform: translate(-50%);
      flex-direction: column;
      background-color: white;
      width: 99vw;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      transition: all 200ms ease-in-out;
      padding: 10px 0;
    }
  }
  @media screen and (min-width: 1170px) {
    .burger {
      display: none;
    }
  }
`;

export default Navbar;
