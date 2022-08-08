import styled from "styled-components";

const Footer = () => {
  return <Wrapper>this is the footer</Wrapper>;
};

const Wrapper = styled.footer`
  height: 10vh;
  width: 100%;
  border: 1px solid green;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
