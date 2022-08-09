import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Event = ({ event }) => {
  const history = useHistory();
  console.log(event);
  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/events/", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: event._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    window.location.reload(true);
  };

  return (
    <Wrapper>
      <p>{`User: ${event.user || "user undefined"}`}</p>
      <p>{`Name: ${event.firstName} ${event.lastName}`}</p>
      <p>{`Date & Address: ${event.postalCode} - ${event.date}`}</p>
      <p>{`Theme & Description: ${event.theme} - ${event.description} `}</p>
      <ColorsDiv>
        {event.colors?.map((color) => {
          return <Color key={Math.floor(Math.random() * 1000)} color={color} />;
        })}
      </ColorsDiv>
      <img src={event.image} />
      <StyledLink to={`/events/${event._id}`}>Update</StyledLink>
      <DeleteButton onClick={handleClick}>Delete</DeleteButton>
    </Wrapper>
  );
};

const DeleteButton = styled.button`
  text-decoration: none;
  font-size: large;
  color: white;
  width: fit-content;
  height: 30px;
  border: none;
  background-color: red;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: fit-content;
  height: 30px;
  border: none;
  background-color: orange;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;

const ColorsDiv = styled.div`
  display: flex;
`;

const Color = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: lightyellow;

  p {
    height: 30px;
    font-size: large;
  }

  img {
    width: 200px;
  }
`;

export default Event;