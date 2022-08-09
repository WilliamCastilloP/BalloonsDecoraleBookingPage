import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";
import ColorButton from "../components/ColorButton";

const UpdatePage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const history = useHistory();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastname,
    postalCode,
    setPostalCode,
    date,
    setDate,
    theme,
    setTheme,
    description,
    setDescription,
    pickedColors,
    isSelectedColor,
    handleClick,
    COLORS,
  } = useContext(BookingContext);

  useEffect(() => {
    fetch(`http://localhost:8000/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, []);

  console.log(event);

  return (
    <Wrapper>
      Please, update your event
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:8000/events", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _id: event.found._id,
              firstName,
              lastName,
              postalCode,
              date,
              theme,
              pickedColors,
              description,
            }),
          }).then((res) => {
            res.status === 200 ? history.push("/events") : console.log(res);
          });
        }}
      >
        <ImageDiv>
          {!!event ? <PickedImage src={event.found.image?.url} /> : <p>😕</p>}
        </ImageDiv>
        <InputsDiv>
          <div>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              name={firstName}
              value={firstName}
              placeholder="Name"
              type="text"
              required
            />
            <Input
              onChange={(e) => setLastname(e.target.value)}
              name={lastName}
              value={lastName}
              placeholder="Lastname"
              type="text"
              required
            />
            <Input
              onChange={(e) => setPostalCode(e.target.value)}
              name={postalCode}
              value={postalCode}
              placeholder="Address or postal code"
              type="text"
              required
            />
            <Input
              onChange={(e) => setDate(e.target.value)}
              name={date}
              value={date}
              type="date"
              required
            />
            <Input
              onChange={(e) => setTheme(e.target.value)}
              name={theme}
              value={theme}
              placeholder="Theme"
              type="text"
              required
            />
            <ColorsDiv>
              {COLORS.map((color, index) => {
                return (
                  <ColorButton
                    key={index}
                    handleClick={(e) => handleClick(e, index)}
                    value={color}
                    color={color}
                    isClicked={isSelectedColor[index]}
                  />
                );
              })}
            </ColorsDiv>
          </div>
          <Description
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Please, add a brief description of your event"
            required
          ></Description>
          <Button type="submit">Request Event</Button>
        </InputsDiv>
      </Form>
    </Wrapper>
  );
};

const Description = styled.textarea`
  font-size: large;
  resize: none;
  margin: 20px 0;
  padding: 5px;
  border: 1px solid lightgray;

  &::placeholder {
    opacity: 0.5;
  }
`;

const Button = styled.button`
  border-radius: 10px;
  width: 100%;
  height: 50px;
  border: none;
  background-color: #76e7cd;
  cursor: pointer;

  &:active {
    transform: scale(0.99);
  }
`;

const InputsDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const ImageDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-right: 20px;
`;

const PickedImage = styled.img`
  width: 100%;
`;

const ColorsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  font-size: large;
  height: 35px;
  margin: 0 10px 10px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;

  &::placeholder {
    opacity: 0.5;
  }
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  width: 40%;
  min-height: 60vh;
  /* border: 1px solid red; */
  padding: 20px;
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default UpdatePage;
