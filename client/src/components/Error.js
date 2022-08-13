import styled from "styled-components";

const Error = ({ errorMessage }) => {
  return <Wrapper>{errorMessage}</Wrapper>;
};

const Wrapper = styled.div`
  width: fit-content;
  background-color: lightcoral;
  font-weight: 700;
  border: 3px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

export default Error;
