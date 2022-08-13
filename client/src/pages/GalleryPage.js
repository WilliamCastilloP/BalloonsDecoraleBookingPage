import styled from "styled-components";
import { useEffect, useState } from "react";
import GalleryImage from "../components/GalleryImage";

const GalleryPage = () => {
  const [images, setImages] = useState(null);
  const imageUrl = useEffect(() => {
    fetch("http://localhost:8000/images").then((res) =>
      res.json().then((data) => {
        setImages(data);
      })
    );
  }, []);

  return (
    <Wrapper>
      <Banner>
        It all starts here. Do you have something in mind? Check our image
        collection and pick the decoration that looks similar to what you
        looking for!
      </Banner>
      <ImagesWrapper>
        {images?.data.map((image) => {
          return <GalleryImage image={image} />;
        })}
      </ImagesWrapper>
    </Wrapper>
  );
};

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-image: url("https://images.unsplash.com/photo-1499675561012-307e6191ea68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-size: cover;
  background-position-x: 20%;
  background-position-y: 100%;
  background-repeat: no-repeat;
  height: 700px;
  width: 100%;
`;

const ImagesWrapper = styled.div`
  height: fit-content;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export default GalleryPage;
