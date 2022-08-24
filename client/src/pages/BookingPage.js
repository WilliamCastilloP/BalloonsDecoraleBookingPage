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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const history = useHistory();
  const { user } = useContext(AuthenticationContext);
  const form = useRef();

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
    window.scrollTo(0, 0);
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
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATEID,
        form.current,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
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

  return (
    <Wrapper>
      <FormTitle>Booking form.</FormTitle>
      {error.status && <Error errorMessage={error.message} />}
      <Form
        ref={form}
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
              } else if (data.status === 406) {
                setError({
                  status: true,
                  message: "Name and Lastname cannot be numbers",
                });
                setIsLoading(false);
              } else {
                setError({
                  status: true,
                  message: "Please, fill in the missing information",
                });
                setIsLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          setError({ status: false, message: "" });
          sendBookingEmail(e);
        }}
      >
        <ImageDiv>
          {isImageLoaded ? (
            <CircularProgress color="secondary" />
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
            placeholder="Notes"
            name="description"
          ></Description>
          <input
            style={{ display: "none" }}
            name="date"
            value={date}
            readOnly
          />
          <input
            style={{ display: "none" }}
            name="email"
            value={user?.email}
            readOnly
          />
          <Button type="submit" onClick={() => setIsLoading(true)}>
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Book this event"
            )}
          </Button>
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
  color: var(--pink);
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
    width: fit-content;
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

export default BookingPage;
