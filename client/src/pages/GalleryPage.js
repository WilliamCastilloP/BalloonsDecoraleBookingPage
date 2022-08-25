import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import GalleryImage from "../components/GalleryImage";
import { BookingContext } from "../context/BookingContext";
import CircularProgress from "@mui/material/CircularProgress";

const GalleryPage = () => {
  const [images, setImages] = useState(null);
  const { isLoading, setIsLoading } = useContext(BookingContext);
  window.scrollTo(0, 0);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetch("https://balloons-decorale.herokuapp.com/images").then((res) =>
      res.json().then((data) => {
        if (res.status === 200) {
          setIsLoading(false);
          setImages(data);
        }
      })
    );
  }, []);

  return (
    <Wrapper>
      <Banner>
        <BannerText>
          <FirstPart>Everything starts here.</FirstPart>
          <SecondPart>
            Check our gallery images and pick the one that looks similar to what
            you're looking for!
          </SecondPart>
        </BannerText>
      </Banner>
      <ImagesWrapper>
        {isLoading ? (
          <CircularProgress />
        ) : (
          images?.data.map((image) => {
            return <GalleryImage key={image._id} image={image} />;
          })
        )}
      </ImagesWrapper>
    </Wrapper>
  );
};

const SecondPart = styled.span`
  width: 100%;
  font-size: 1.5em;
  background-color: var(--pink);
  padding: 10px;
  @media (max-width: 390px) {
    font-size: 1.2em;
  }
`;

const FirstPart = styled.span`
  width: 100%;
  font-size: 4em;
  margin-bottom: 20px;
  color: var(--pink);
  padding: 10px;

  @media (max-width: 390px) {
    font-size: 3em;
  }
`;

const BannerText = styled.p`
  width: 40%;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  align-items: flex-start;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  color: white;
  background-image: url("https://wallpaperaccess.com/full/1555599.jpg");
  background-size: cover;
  background-position-x: 20%;
  background-position-y: 100%;
  background-repeat: no-repeat;
  height: 700px;
  width: 100%;

  @media (max-width: 390px) {
    background-position-x: 50%;
    background-position-y: 100%;
  }
`;

const ImagesWrapper = styled.div`
  height: fit-content;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
  margin-top: 20px;
  background-color: var(--lighterpink);
`;

const Wrapper = styled.div`
  background-color: var(--lighterpink);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 78vh;
`;

export default GalleryPage;
