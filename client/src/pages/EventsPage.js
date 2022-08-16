import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { format, parseISO } from "date-fns";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Event from "../components/Event";
import ErrorPage from "./ErrorPage";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const { isLoading, setIsLoading } = useContext(BookingContext);
  const { isAdmin } = useContext(AuthenticationContext);
  const errorMessage = "Oops, only admins can access this page";
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

  events.sort((a, b) => {
    const eventA = new Date(parseISO(a.date));
    const eventB = new Date(parseISO(b.date));
    return eventA - eventB;
  });

  return (
    <Wrapper>
      {isLoading ? (
        <CircularProgress />
      ) : isAdmin ? (
        <AllEvents>
          {events.map((event, index) => {
            return (
              <Event
                key={event._id}
                event={event}
                setEvents={setEvents}
                events={events}
                index={index}
              />
            );
          })}
        </AllEvents>
      ) : (
        <ErrorPage errorMessage={errorMessage} />
      )}
    </Wrapper>
  );
};

const Message = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: var(--pink);
`;

const AllEvents = styled.div`
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div`
  min-height: 80vh;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--lighterpink);

  @media (max-width) {
  }
`;

export default EventsPage;
