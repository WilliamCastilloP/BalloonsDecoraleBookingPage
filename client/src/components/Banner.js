import styled from "styled-components";

const Banner = ({ imageUrl }) => {
  return (
    <Wrapper style={{ backgroundImage: `url(${imageUrl})` }}>
      <TitleContainer>
        {/* <FirstPart>Welcome to</FirstPart>  */}
        <SecondPart>Balloons</SecondPart>
        <ThirdPart className="third-part">Decorale</ThirdPart>
      </TitleContainer>
    </Wrapper>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThirdPart = styled.span`
  width: fit-content;
  font-size: 7em;
  font-weight: 600;
  margin-left: 200px;
  background-color: white;
  color: var(--pink);
  display: flex;
  justify-content: center;
  padding: 10px;
  transition: all 200ms ease-in-out;

  &:hover {
    margin-left: 0;
  }

  @media (max-width: 780px) {
    font-size: 5em;
    margin-left: 180px;
  }
  @media (max-width: 600px) {
    margin-left: 110px;
    font-size: 3em;
  }
`;

const SecondPart = styled.span`
  width: fit-content;
  font-size: 7em;
  font-weight: 700;
  background-color: var(--pink);
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;

  @media (max-width: 780px) {
    font-size: 5em;
  }
  @media (max-width: 600px) {
    font-size: 3em;
  }
`;

const FirstPart = styled.span`
  width: fit-content;
  font-size: 2em;
  font-weight: 600;
  margin-left: -100px;
  margin-bottom: 20px;
  color: var(--pink);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 700px;
  width: 100%;

  &:hover .third-part {
    margin-left: 0;
  }
`;

export default Banner;
