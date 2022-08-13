import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthenticationContext } from "../context/AuthenticationContext";
let backgroundImage = "";
const GalleryImage = ({ image }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  backgroundImage = image;
  return (
    // <Wrapper image={image.url} className="wrapper">
    <Wrapper>
      <Img src={image.url} />
      <Overlay>
        <StyledLink
          className="styledLink"
          key={image._id}
          to={isAuthenticated ? `/booking/${image._id}` : "/signin"}
        >
          Book this decoration
        </StyledLink>
      </Overlay>
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  position: absolute;
  top: 82%;
  left: 60%;
  text-decoration: none;
  height: 50px;
  width: 100px;
  background-color: var(--pink);
  border: 2px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  color: white;
  display: none;

  &:hover {
    background-color: var(--darkpink);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 150ms;
  border-radius: 2px;

  &:hover {
    opacity: 1;
  }

  &:hover .styledLink {
    display: flex;
  }
`;

const Img = styled.img`
  width: 100%;
  display: block;
  height: 100%;
  border-radius: 2px;
`;

const Wrapper = styled.div`
  width: 330px;
  height: 430px;
  position: relative;
  margin: 10px;
  transition: transform 200ms;
  border-radius: 2px;
`;

export default GalleryImage;
