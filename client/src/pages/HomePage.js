import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";

const HomePage = (props) => {
  const imageUrl =
    "https://res.cloudinary.com/dpr59qtfp/image/upload/v1660502503/balloons%20decolare%20gallery/pink_balloons-wallpaper-1920x1080_h01mui.jpg";
  return (
    <Wrapper>
      <Banner imageUrl={imageUrl} />
      <Content>
        <WelcomeDiv>
          <Text>Welcome to Balloons Decorale booking page.</Text>
          <WelcomeText>
            <Text>
              Browse our gallery of beautiful balloons decorations, plan your
              next event, make reservations and much more!
            </Text>
          </WelcomeText>
        </WelcomeDiv>
        <StyledLink to="/gallery">Get Started</StyledLink>
      </Content>
    </Wrapper>
  );
};

const Text = styled.span`
  margin: 20px;
`;
const WelcomeText = styled.div`
  margin: 20px 0;
`;

const WelcomeDiv = styled.div`
  width: 70%;
  text-align: center;
  font-size: 1.5em;
  font-weight: 600;

  @media (max-width: 390px) {
    width: 90%;
    font-size: 1.2em;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 170px;
  height: 50px;
  font-size: 1.5em;
  font-weight: 600;
  color: white;
  background-color: var(--darkpink);
  margin-top: 50px;
  border-radius: 50px;
  transition: 200ms ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

  &:hover {
    transform: translateY(-5%);
  }

  @media (max-width: 390px) {
    width: 100px;
    height: 35px;
    font-size: 0.9em;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  padding: 0 200px;
  background-color: var(--lighterpink);
  color: var(--pink);
  font-size: 1.2em;
  font-weight: 500;

  @media (max-width: 1170px) {
    padding: 0 100px;
  }
  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;
export default HomePage;
