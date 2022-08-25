import styled from "styled-components";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const Event = ({
  index,
  event,
  setIsUpdated,
  isUpdated,
  setEvents,
  events,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    fetch("https://balloons-decorale.herokuapp.com/events/", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: event._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          events.splice(index, 1);
          setEvents([...events]);
        }
      });
  };

  return (
    <Wrapper>
      <EventImage>
        <Img src={event.image} />
        <EventDetails className="events-details">
          <Info>{`${event.user.name || "user undefined"}`}</Info>
          {/* <p>{`${event.firstName} ${event.lastName}`}</p> */}
          <Info>{`Theme: ${event.theme}`}</Info>
          <Info>{`Description: ${event.description} `}</Info>
          <ColorsDiv>
            {event.pickedColors?.map((color) => {
              return (
                <Color
                  key={Math.floor(Math.random() * 1000000000)}
                  color={color}
                />
              );
            })}
          </ColorsDiv>
        </EventDetails>
      </EventImage>
      <Date>{`${format(parseISO(event.date), "dd-MM-yyyy")}`}</Date>
      <Actions>
        <StyledLink to={`/all-events/${event._id}`}>
          <i className="fa-solid fa-pen-to-square"></i>
        </StyledLink>
        <DeleteButton onClick={handleClick} type="submit">
          <i className="fa-solid fa-trash"></i>
        </DeleteButton>
      </Actions>
    </Wrapper>
  );
};

const Info = styled.p`
  margin-bottom: 10px;
`;

const Date = styled.p`
  text-align: center;
  font-size: 1.3em;
  background-color: var(--pink);
  color: white;
  margin-top: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 335px;
  display: block;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

const EventImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 2px;

  &:hover .events-details {
    bottom: 0;
    opacity: 1;
  }
`;
const EventDetails = styled.div`
  opacity: 0;
  flex-direction: column;
  align-content: space-between;
  position: absolute;
  bottom: -10px;
  background-color: rgb(0, 0, 0, 0.7);
  color: lightgray;
  width: 100%;
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;
  transition: all 200ms ease-in-out;
`;
const Actions = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  border-radius: 2px;
`;

const DeleteButton = styled.button`
  text-decoration: none;
  font-size: 1em;
  width: 50%;
  height: 100%;
  border: none;
  background-color: white;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: orange;
  width: 50%;
  height: 100%;
  border: none;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: orange;
    color: white;
  }
`;

const ColorsDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Color = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
`;

const Wrapper = styled.div`
  width: 250px;
  height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  background-color: lightyellow;
  box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.2);
  border-radius: 2px;

  @media (max-width: 900px) {
    width: 450px;
  }
`;

export default Event;
