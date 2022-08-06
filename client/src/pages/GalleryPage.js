import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const GalleryPage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <ImagesWrapper>
        {Array.from({ length: 50 }).map((_, index) => (
          <Link to={`/gallery/${index}`}>
            <Img
              value={index}
              src={`${process.env.PUBLIC_URL}/images/${index + 1}.jpeg`}
            />
          </Link>
        ))}
      </ImagesWrapper>
    </Wrapper>
  );
};

console.log(Array.from({ length: 50 }));

const ImagesWrapper = styled.div`
  /* width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; */
`;

const Wrapper = styled.div`
  width: 100%;
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
