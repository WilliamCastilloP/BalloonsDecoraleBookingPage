import styled from "styled-components";
import LoginButton from "../components/LoginButton";

const SignInPage = () => {
  return (
    <Wrapper>
      Please login to book an event
      <LoginButton />
    </Wrapper>
  );
};

const Input = styled.input`
  margin: 10px;
  padding: 5px;
  width: 80%;
`;

const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  border: 1px solid red;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default SignInPage;
