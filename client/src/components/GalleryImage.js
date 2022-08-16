import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthenticationContext } from "../context/AuthenticationContext";

const GalleryImage = ({ image }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <Wrapper>
      <Img src={image.url} />
      <Overlay>
        <StyledLink
          className="styledLink"
          key={image._id}
          to={`/booking/${image._id}`}
        >
          Book this decoration
        </StyledLink>
      </Overlay>
    </Wrapper>
  );
};

const StyledLink = styled(Link)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-decoration: none;
  height: 50px;
  width: 100%;
  background-color: var(--pink);
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 2px;
  color: white;
  display: flex;
  opacity: 0;
  transition: all 200ms ease-in-out;

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
  transition: opacity 200ms ease-in-out;
  border-radius: 2px;

  &:hover {
    opacity: 1;
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
  transition: transform 200ms ease-in-out;
  border-radius: 2px;
  &:hover .styledLink {
    top: 50%;
    opacity: 1;
  }

  @media (max-width: 1330px) {
    width: 530px;
    height: 630px;
  }
  @media (max-width: 1145px) {
    width: 630px;
    height: 730px;
    margin: 20px;
  }
`;

export default GalleryImage;
