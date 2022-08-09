import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Event from "../components/Event";
import { withAuthenticationRequired } from "@auth0/auth0-react";
const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.foundEvents);
      });
  }, []);

  console.log(events);

  return (
    <Wrapper>
      <AllEvents>
        {events.map((event) => {
          return <Event key={event._id} event={event} />;
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
