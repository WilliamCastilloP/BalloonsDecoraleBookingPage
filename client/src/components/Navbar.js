import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Wrapper>
      <Link to="/">Logo</Link>
      <LinksWrapper>
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/booking">Booking</Link>
      </LinksWrapper>
      <Link to="/signin">Sign In</Link>
    </Wrapper>
  );
};

const LinksWrapper = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  border: 1px solid red;
  padding: 10px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Navbar;
