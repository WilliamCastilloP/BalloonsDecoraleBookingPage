import styled from "styled-components";
import LoginButton from "../components/LoginButton";

const SignInPage = () => {
  return (
    <Wrapper>
      <LoginCard>
        <LoginMessage>Please login before booking a decoration</LoginMessage>
        <LoginButton />
      </LoginCard>
    </Wrapper>
  );
};

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  padding: 50px;
  text-align: center;
  overflow-wrap: break-word;
  box-sizing: border-box;
  border-radius: 5px;
`;

const LoginMessage = styled.p`
  font-size: 1.1em;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default SignInPage;
