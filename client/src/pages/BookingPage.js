import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import ColorButton from "../components/ColorButton";
import Calendar from "react-calendar";
import Error from "../components/Error";
import CircularProgress from "@mui/material/CircularProgress";

const BookingPage = () => {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const history = useHistory();
  const { user } = useContext(AuthenticationContext);
  console.log(user);
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
    isUpdated,
    setIsUpdated,
    resetForm,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useContext(BookingContext);

  useEffect(() => {
    fetch(`http://localhost:8000/booking/${imageId}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data);
      });
  }, []);

  useEffect(() => {
    setIsUpdated(!isUpdated);
    resetForm();
  }, []);

  const errorMessage = "Please, fill the missing info";
  return (
    <Wrapper>
      Booking form
      {error && <Error errorMessage={errorMessage} />}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:8000/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: user,
              firstName,
              lastName,
              postalCode,
              date,
              theme,
              pickedColors,
              description,
              image: image.url,
              isSelectedColor,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 200) {
                history.push("/confirmation");
                resetForm();
              } else {
                setError(true);
                setIsLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <ImageDiv>
          <PickedImage src={image?.url} />
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
              value={date}
              onChange={setDate}
              className="calendarDiv"
              tileClassName="calendarTile"
              minDate={new Date()}
              tileDisabled={tileDisabled}
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
            value={description}
            rows="4"
            cols="50"
            placeholder="Please, add a brief description of your event"
          ></Description>
          <Button type="submit" onClick={() => setIsLoading(true)}>
            {isLoading ? <CircularProgress size={20} /> : "Book this event"}
          </Button>
        </InputsDiv>
      </Form>
    </Wrapper>
  );
};

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
`;

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
  width: 800px;
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

export default BookingPage;
