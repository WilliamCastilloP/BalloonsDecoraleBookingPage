import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { BookingContext } from "../context/BookingContext";
import { format, parseISO } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

const UserBookedDecoration = () => {
  const [events, setEvents] = useState(null);
  const { user } = useContext(AuthenticationContext);
  const { isLoading, setIsLoading } = useContext(BookingContext);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setEvents(data.foundEvents);
          setIsLoading(false);
        }
      });
  }, []);

  let userBookedEvents = [];
  events?.forEach((event) => {
    if (event.user?.sub === user?.sub) {
      userBookedEvents.push(event);
    }
  });

  return (
    <Wrapper>
      {isLoading ? (
        <CircularProgress />
      ) : events?.length < 1 ? (
        <p>No decoration has been booked yet.</p>
      ) : (
        <EventsContainer>
          {userBookedEvents.map((bookedEvent) => {
            return (
              <Event key={bookedEvent._id}>
                <div>
                  <Img src={bookedEvent.image} />
                </div>
                <InfoDiv>
                  <InfoLabel>Colors:</InfoLabel>
                  <ColorsDiv>
                    {bookedEvent.pickedColors.map((pickedColor, index) => {
                      return <Color key={index} color={pickedColor}></Color>;
                    })}
                  </ColorsDiv>
                  <InfoLabel>Description:</InfoLabel>
                  <Info>{bookedEvent.description}</Info>
                  <InfoLabel>Theme:</InfoLabel>
                  <Info>{bookedEvent.theme}</Info>
                  <InfoLabel>Address or postal code:</InfoLabel>
                  <Info>{bookedEvent.postalCode}</Info>
                  <InfoLabel>Date:</InfoLabel>
                  <InfoDate>
                    {format(parseISO(bookedEvent.date), "dd-MM-yyyy")}
                  </InfoDate>
                </InfoDiv>
              </Event>
            );
          })}
        </EventsContainer>
      )}
    </Wrapper>
  );
};

const InfoLabel = styled.p`
  margin: 10px 0;
  font-size: 1.2em;
  font-weight: 600;
`;

const Info = styled.p`
  margin-bottom: 10px;
  font-size: 1em;
`;

const InfoDate = styled.p`
  margin-bottom: 10px;
  font-size: 1em;
  width: fit-content;
  padding: 5px;
  background-color: yellow;
`;

const ColorsDiv = styled.div`
  display: flex;
`;

const Color = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ color }) => `${color}`};
`;

const InfoDiv = styled.div`
  padding: 20px;
`;

const EventsContainer = styled.div`
  width: 50%;
  height: fit-content;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 350px;
  height: 100%;
  display: block;

  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const Event = styled.div`
  width: 80%;
  display: flex;
  height: fit-content;
  background-color: var(--lightpink);
  margin: 15px 0;

  &:nth-child(odd) {
    background-color: var(--lighterpink);
  }
  @media (max-width: 1100px) {
    width: 400px;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 78vh;
  margin: 20px 0;
`;

export default UserBookedDecoration;
