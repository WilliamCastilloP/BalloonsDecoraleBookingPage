import { Link } from "react-router-dom";
import styled from "styled-components";

const GalleryImage = ({ image }) => {
  return (
    <Wrapper>
      <Img classname="image" src={image.url} />
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

  @media (max-width: 1145px) {
    height: 70px;
    font-size: 1.2em;
  }

  @media (max-width: 390px) {
    height: 35px;
    font-size: 0.7em;
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
  width: 400px;
  /* height: 430px; */
  position: relative;
  margin: 10px;
  transition: transform 200ms ease-in-out;
  border-radius: 2px;
  &:hover .styledLink {
    top: 50%;
    opacity: 1;
  }

  @media (max-width: 1300px) {
    width: calc(calc(100vw - 100px) / 3);
  }
  @media (max-width: 800px) {
    width: calc(calc(100vw - 80px) / 2);
  }
  @media (max-width: 600px) {
    width: calc(100vw - 60px);
  }

  @media (max-width: 390px) {
    width: calc(100vw - 40px);
  }
`;

export default GalleryImage;
