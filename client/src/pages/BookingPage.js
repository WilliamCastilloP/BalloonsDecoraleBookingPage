import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import ColorButton from "../components/ColorButton";

const BookingPage = () => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [date, setDate] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [isSelectedColor, setIsSelectedColor] = useState(Array(20).fill(false));
  const [pickedColors, setPickedColors] = useState([]);
  const { imageId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/booking/${imageId}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data);
      });
  }, []);

  const COLORS = [
    "black",
    "white",
    "gold",
    "silver",
    "red",
    "#FA8072",
    "orange",
    "#a66c08",
    "#ccbda3",
    "yellow",
    "#acf7a1",
    "#63a649",
    "green",
    "turquoise",
    "lightblue",
    "blue",
    "#bf63db",
    "magenta",
    "#FFB6C1",
    "#e6a1f7",
  ];

  const handleClick = (e, index) => {
    e.preventDefault();
    const foundIndex = pickedColors.findIndex(
      (pickedColor) => pickedColor === e.currentTarget.value
    );
    console.log(foundIndex, e.currentTarget);
    if (foundIndex !== -1) {
      pickedColors.splice(foundIndex, 1);
      setPickedColors([...pickedColors]);
    } else {
      setPickedColors([...pickedColors, e.currentTarget.value]);
    }

    const newState = [...isSelectedColor];
    newState[index] = !newState[index];
    setIsSelectedColor(newState);
  };

  console.log(pickedColors);

  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:8000/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName,
              lastName,
              postalCode,
              date,
              theme,
              pickedColors,
              description,
            }),
          }).then((res) => {
            res.status === 200
              ? history.push("/confirmation")
              : console.log(res);
          });
        }}
      >
        <ImageDiv>
          <PickedImage src={image?.url} />
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
                  >
                    {/* {isClicked && <BiCheckCircle size={18} color="darkgrey" />} */}
                  </ColorButton>
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
  background-color: lightgreen;
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

// const Color = styled.button`
//   width: 30px;
//   height: 30px;
//   border-radius: 5px;
//   border: none;
//   background-color: ${(props) => props.color};
//   margin: 0px;
//   box-shadow: 0 0 2px rgb(0, 0, 0, 0.5);
//   cursor: pointer;
//   transition: 100ms ease-in-out;
//   margin: 2px;

//   &:hover {
//     transform: scale(1.1);
//     transition: 200ms ease-in-out;
//   }
// `;

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

export default BookingPage;
