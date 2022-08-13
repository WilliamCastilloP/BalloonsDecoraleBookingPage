import { useEffect, useState } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import styled from "styled-components";

import Event from "../components/Event";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    fetch("http://localhost:8000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.foundEvents);
      });
  }, []);
  let datesArray = [];
  events.forEach((event) => {
    datesArray.push(event.date);
  });

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const AllEvents = styled.div`
  width: 80vw;
`;

const Wrapper = styled.div`
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withAuthenticationRequired(EventsPage, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
