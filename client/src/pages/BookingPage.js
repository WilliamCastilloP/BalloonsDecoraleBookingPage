import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";
import { AuthenticationContext } from "../context/AuthenticationContext";
import ColorButton from "../components/ColorButton";
import Calendar from "react-calendar";
import Error from "../components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import emailjs from "@emailjs/browser";

const BookingPage = () => {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const history = useHistory();
  const { user } = useContext(AuthenticationContext);
  const form = useRef();
  window.scrollTo(0, 0);
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    setIsUpdated(!isUpdated);
    setIsImageLoaded(true);
    resetForm();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/booking/${imageId}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data);
        setIsImageLoaded(false);
      });
  }, []);

  const sendBookingEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3fyxw3z",
        "template_nhexrdk",
        form.current,
        "IlM8uCvNU_2y0ct0s"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const errorMessage = "Please, fill in the missing information";
  return (
    <Wrapper>
      <FormTitle>Booking form.</FormTitle>

      <Form
        ref={form}
        onSubmit={(e) => {
          console.log(e);
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
          sendBookingEmail(e);
        }}
      >
        <ImageDiv>
          {isImageLoaded ? (
            <CircularProgress />
          ) : (
            <PickedImage src={image?.url} />
          )}
        </ImageDiv>
        <InputsDiv>
          <div>
            <InputsWrapper>
              <Input
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                value={firstName}
                placeholder="Name"
                type="text"
              />
              <Input
                onChange={(e) => setLastname(e.target.value)}
                name="lastName"
                value={lastName}
                placeholder="Lastname"
                type="text"
              />
            </InputsWrapper>
            <InputsWrapper>
              <Input
                onChange={(e) => setPostalCode(e.target.value)}
                name="postalCode"
                value={postalCode}
                placeholder="Address or postal code"
                type="text"
              />
              <Input
                onChange={(e) => setTheme(e.target.value)}
                name="theme"
                value={theme}
                placeholder="Theme"
                type="text"
              />
            </InputsWrapper>
            <Calendar
              name="date"
              value={date}
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
            name="description"
          ></Description>
          <input style={{ display: "none" }} name="date" value={date} />
          <input style={{ display: "none" }} name="email" value={user?.email} />
          <Button type="submit" onClick={() => setIsLoading(true)}>
            {isLoading ? <CircularProgress size={20} /> : "Book this event"}
          </Button>
        </InputsDiv>
      </Form>
      {error && <Error errorMessage={errorMessage} />}
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
`;

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
  border-radius: 5px;
  width: 100%;
  height: 50px;
  border: none;
  background-color: var(--pink);
  color: var(--lightpink);
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
  align-items: center;
  margin-right: 20px;
`;

const PickedImage = styled.img`
  width: 100%;
  height: 100%;
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
  margin: 20px 0;
  display: flex;
  width: 1000px;
  min-height: 60vh;

  padding: 20px;
  box-shadow: 0 0 3px rgb(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export default BookingPage;
