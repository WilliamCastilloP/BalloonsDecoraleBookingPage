import styled from "styled-components";

const Error = ({ errorMessage }) => {
  return <Wrapper>{errorMessage}</Wrapper>;
};

const Wrapper = styled.div`
  width: 50%;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
`;

export default Error;
