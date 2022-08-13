import styled from "styled-components";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";

const HomePage = (props) => {
  const imageUrl =
    "https://images.unsplash.com/photo-1657382451868-948d29b28f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80";
  return (
    <Wrapper>
      <Banner imageUrl={imageUrl} />
      <Content>
        <p>
          Browse our gallery of beautiful balloons decorations, plan your next
          event, make reservations and much more!
        </p>
        <StyledLink to="/gallery">Get Started</StyledLink>
      </Content>
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: fit-content;
  font-size: 1.5em;
  font-weight: 600;
  color: white;
  height: 50px;
  background: var(--pink);
  margin-top: 50px;
  border-radius: 15px;
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
  background-color: var(--lightpink);
  color: var(--pink);
  font-size: 1.5em;
  font-weight: 500;
`;

const Wrapper = styled.div``;
export default HomePage;
