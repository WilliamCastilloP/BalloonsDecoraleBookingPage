import styled from "styled-components";

const SignInPage = () => {
  return (
    <Wrapper>
      Sign In
      <Form>
        <Input type="text" placeholder="name" required />
        <Input type="text" placeholder="lastname" required />
        <Input type="email" placeholder="email" required />
        <Input type="password" placeholder="password" required />
        <button>Sign me in</button>
      </Form>
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
