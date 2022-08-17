import { useContext } from "react";
import styled from "styled-components";
import { AuthenticationContext } from "../context/AuthenticationContext";

const ConfirmationPage = () => {
  const { user, isAuthenticated } = useContext(AuthenticationContext);

  return (
    <Wrapper>
      <Card>
        <Confirmation>🎉 🎉 🎉 It's confirmed! 🎉 🎉 🎉 </Confirmation>
        <MessageThanks>
          <UserName>{user?.name}</UserName>, thank you for booking your
          decoration with us.
        </MessageThanks>
        <OtherMessage>
          An email has been sent to us with all of your decoration details
        </OtherMessage>
        <OtherMessage>
          Someone from our team will contact you shortly to discuss all the
          details.
        </OtherMessage>
      </Card>
    </Wrapper>
  );
};

const Confirmation = styled.p`
  font-size: 1.1em;
  margin-bottom: 20px;
`;

const MessageThanks = styled.p`
  font-size: 1.7em;
  margin: 20px 0;
`;

const UserName = styled.span`
  font-weight: 600;
  color: var(--darkpink);
`;

const OtherMessage = styled.p`
  font-size: 1.2em;
  margin: 10px 0;
`;

const Card = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  border: 5px solid var(--lightpink);
  padding: 30px;
  color: var(--pink);

  @media (max-width: 1170px) {
    width: 35%;
  }
  @media (max-width: 950px) {
    width: 40%;
  }
  @media (max-width: 780px) {
    width: 45%;
  }
  @media (max-width: 600px) {
    width: 60%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  flex-direction: column;
  color: var(--pink);
`;

export default ConfirmationPage;
