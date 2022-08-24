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
          <LogoImg src="https://res.cloudinary.com/dpr59qtfp/image/upload/v1660708483/balloons%20decolare%20gallery/LOGOFINAL_zt4q0q.jpg" />
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
            <Icon>
              <i className="fa-solid fa-house"></i>
            </Icon>
            Home
          </StyledNavLink>
          <StyledNavLink onClick={() => setIsClicked(false)} to="/gallery">
            <Icon>
              <i className="fa-solid fa-image"></i>
            </Icon>
            Gallery
          </StyledNavLink>
          {isAdmin ? (
            <StyledNavLink onClick={() => setIsClicked(false)} to="/events">
              <Icon>
                <i className="fa-solid fa-calendar-check"></i>
              </Icon>
              Booked Decorations
            </StyledNavLink>
          ) : (
            isAuthenticated && (
              <StyledNavLink
                onClick={() => setIsClicked(false)}
                to="/booked-decoration"
              >
                <Icon>
                  <i className="fa-solid fa-calendar-check"></i>
                </Icon>
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

const Icon = styled.span`
  margin-right: 5px;
  font-size: 1.1em;
`;

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
  width: 150px;
  height: 12vh;
  @media (max-width: 600px) {
    width: 120px;
    height: 100px;
  }
  @media (max-width: 390px) {
    width: 100px;
    height: 90px;
  }
`;

const UserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
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
  margin: 0 10px;
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
  margin-right: 10px;

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
  width: 40%;
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
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1350px) {
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
      width: 100vw;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      transition: all 200ms ease-in-out;
    }

    .links-div-active {
      position: absolute;
      top: 83px;
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

  @media screen and (max-width: 445px) {
    .links-div-active {
      position: absolute;
      top: 83px;
      left: 50%;
      transform: translate(-50%);
      flex-direction: column;
      background-color: white;
      width: 100vw;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      transition: all 200ms ease-in-out;
      padding: 10px 0;
    }
  }
  @media screen and (max-width: 390px) {
    .links-div-active {
      position: absolute;
      top: 74px;
      left: 50%;
      transform: translate(-50%);
      flex-direction: column;
      background-color: white;
      width: 100vw;
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
