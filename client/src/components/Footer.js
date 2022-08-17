import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <div>
        <LinksDiv>
          <StyledLink to="/">Home</StyledLink>
          <Point />
          <StyledLink to="/gallery">Gallery</StyledLink>
          <Point />
          <StyledLink to="/about">About</StyledLink>
        </LinksDiv>
        <Company>Balloons Decorale &copy; 2017</Company>
      </div>
      <InfoContainer className="info-container">
        <InfoDiv>
          <span>
            <i className="fa-solid fa-location-dot"></i>
          </span>
          <Text>Montreal, Qc</Text>
        </InfoDiv>
        <InfoDiv>
          <span>
            <i className="fa-solid fa-phone"></i>
          </span>
          <Text>+1 514 555 5555</Text>
        </InfoDiv>
        <InfoDiv>
          <span>
            <i className="fa-solid fa-envelope"></i>
          </span>
          <Text>balloonsdecorale@gmail.com</Text>
        </InfoDiv>
      </InfoContainer>
      <div>
        <Icons
          to={{ pathname: "https://www.instagram.com/balloonsdecorale/?hl=en" }}
          target="_blank"
        >
          <i className="fa-brands fa-instagram"></i>
        </Icons>
        <Icons
          to={{ pathname: "https://www.tiktok.com/@balloonsdecorale" }}
          target="_blank"
        >
          <i className="fa-brands fa-tiktok"></i>
        </Icons>
      </div>
    </Wrapper>
  );
};

const InfoContainer = styled.div``;

const InfoDiv = styled.div`
  margin-bottom: 10px;
`;

const Text = styled.span`
  margin-left: 20px;
  height: 50px;
`;

const Icons = styled(Link)`
  text-decoration: none;
  margin-left: 20px;
  font-size: 1.5em;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  color: white;
`;

const Point = styled.div`
  width: 3px;
  height: 3px;
  background-color: white;
  margin: 0 15px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: lightgray;
  }
`;

const Company = styled.p`
  color: grey;
  font-size: 0.8em;
`;

const LinksDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const Wrapper = styled.footer`
  height: 20vh;
  width: 100%;
  background-color: #2d3047;
  color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;
  align-items: center;
  margin-top: auto;
  font-size: 1.2em;

  @media (max-width: 1170px) {
    padding: 20px 20px;

    .info-container {
      margin: 30px 0;
    }
  }
  @media (max-width: 790px) {
    flex-direction: column;
    height: fit-content;

    .info-container {
      margin: 30px 0;
    }
  }
`;

export default Footer;
