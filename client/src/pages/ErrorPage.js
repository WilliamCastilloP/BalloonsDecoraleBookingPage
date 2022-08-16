import styled from "styled-components";

const ErrorPage = ({ errorMessage }) => {
  return (
    <Wrapper>
      <span>
        <i class="fa-solid fa-circle-exclamation"></i>
      </span>
      <ErrorMessage>
        <div>
          <p>{errorMessage}</p>
        </div>
      </ErrorMessage>
    </Wrapper>
  );
};

const ErrorMessage = styled.p`
  font-size: 2em;
  font-weight: 600;
  text-align: center;
  margin-top: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 78vh;
  flex-direction: column;

  span {
    font-size: 4em;
  }
`;

export default ErrorPage;
