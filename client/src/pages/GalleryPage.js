import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { useContext } from "react";

const GalleryPage = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const history = useHistory();
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/images").then((res) =>
      res.json().then((data) => {
        setImages(data);
      })
    );
  }, []);

  return (
    <Wrapper>
      <ImagesWrapper>
        {images?.data.map((image) => (
          <Link
            key={image._id}
            to={isAuthenticated ? `/booking/${image._id}` : "/signin"}
          >
            <Img src={image.url} />
          </Link>
        ))}
      </ImagesWrapper>
    </Wrapper>
  );
};

const ImagesWrapper = styled.div`
  /* width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; */
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  /* display: flex; */
  /* flex-wrap: wrap; */
`;

const Img = styled.img`
  /* cursor: zoom-in;
  position: absolute; */
  width: 30%;
  margin: 5px;
  transition: 200ms ease-in-out;
  &:hover {
    box-shadow: 0 0 20px rgb(0, 0, 0, 1);
    transition: 100ms ease-in-out;
    transform: scale(1.03);
  }
`;

export default GalleryPage;
