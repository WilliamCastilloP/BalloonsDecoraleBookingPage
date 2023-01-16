import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";
import ColorButton from "../components/ColorButton";
import Calendar from "react-calendar";
import Error from "../components/Error";
import CircularProgress from "@mui/material/CircularProgress";

const UpdatePage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState({ status: false, message: "" });
  const [isImageLoaded, setIsImageLoaded] = useState(true);
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
    tileDisabled,
    fillData,
  } = useContext(BookingContext);

  useEffect(() => {
    fetch(`https://balloons-decorale.onrender.com/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setIsImageLoaded(false);
        setEvent(data);
        fillData(data.found);
      });
  }, []);

  useEffect(() => {
    setIsImageLoaded(true);
  }, []);

  return (
    <Wrapper>
      <FormTitle>
        Please edit the fields you wish to update and then click Update
      </FormTitle>

      {error.status && <Error errorMessage={error.message} />}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("https://balloons-decorale.onrender.com/events", {
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
              isSelectedColor,
              description,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 200) {
                history.push("/all-events");
              } else {
                setError({
                  status: true,
                  message: "Please, fill in the missing information",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <ImageDiv>
          {isImageLoaded ? (
            <CircularProgress color="secondary" />
          ) : (
            <PickedImage src={event?.found.image} />
          )}
        </ImageDiv>
        <InputsDiv>
          <div>
            <InputsWrapper>
              <Input
                onChange={(e) => setFirstName(e.target.value)}
                name={firstName}
                value={firstName}
                placeholder="Name"
                type="text"
              />
              <Input
                onChange={(e) => setLastname(e.target.value)}
                name={lastName}
                value={lastName}
                placeholder="Lastname"
                type="text"
              />
            </InputsWrapper>
            <InputsWrapper>
              <Input
                onChange={(e) => setPostalCode(e.target.value)}
                name={postalCode}
                value={postalCode}
                placeholder="Address or postal code"
                type="text"
              />
              <Input
                onChange={(e) => setTheme(e.target.value)}
                name={theme}
                value={theme}
                placeholder="Theme"
                type="text"
              />
            </InputsWrapper>
            <Calendar
              onChange={setDate}
              className="calendarDiv"
              tileClassName="calendarTile"
              minDate={new Date()}
              tileDisabled={tileDisabled}
            />
            <Message>Please, select your colors</Message>
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
            value={description}
            rows="4"
            cols="50"
            placeholder="Please, add a brief description of your event"
          ></Description>
          <Button type="submit">Update Decoration</Button>
        </InputsDiv>
      </Form>
    </Wrapper>
  );
};

const Message = styled.p`
  text-align: center;
  color: var(--pink);
  margin-top: 10px;
`;

const FormTitle = styled.p`
  margin: 50px 0 0 0;
  color: var(--pink);
  text-align: center;
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Description = styled.textarea`
  font-size: 1.2em;
  resize: none;
  margin: 20px 0;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid lightgray;

  &::placeholder {
    opacity: 0.5;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  width: 100%;
  height: 50px;
  border: none;
  background-color: var(--pink);
  color: var(--lighterpink);
  font-weight: 600;
  font-size: 1.2em;
  cursor: pointer;

  &:active {
    transform: scale(0.99);
  }

  &:hover {
    background-color: var(--darkpink);
  }
`;

const ColorsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1em;
  height: 35px;
  margin: 0 5px 5px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;

  &::placeholder {
    opacity: 0.5;
  }
`;

const InputsDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  padding: 5px;
  box-sizing: border-box;
  @media (max-width: 1100px) {
    margin-top: 20px;
  }

  @media (max-width: 390px) {
    width: 90%;
  }
`;

const ImageDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 5px 5px;

  @media (max-width: 390px) {
    width: 90%;
  }
`;

const PickedImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  width: 1000px;
  min-height: 60vh;
  box-shadow: 0 0 3px rgb(0, 0, 0, 0.2);
  margin: 50px 0;
  padding: 20px;

  @media (max-width: 1100px) {
    width: 800px;
    flex-direction: column;
  }
  @media (max-width: 390px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export default UpdatePage;
