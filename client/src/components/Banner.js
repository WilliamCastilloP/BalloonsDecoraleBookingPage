import styled from "styled-components";

const Banner = ({ imageUrl }) => {
  return (
    <Wrapper style={{ backgroundImage: `url(${imageUrl})` }}>
      <TitleContainer>
        {/* <FirstPart>Welcome to</FirstPart>  */}
        <SecondPart>Balloons</SecondPart>
        <ThirdPart>Decorale</ThirdPart>
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
`;

export default Banner;
