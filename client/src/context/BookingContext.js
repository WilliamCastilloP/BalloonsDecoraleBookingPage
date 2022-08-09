import { createContext } from "react";
import { useState } from "react";

export const BookingContext = createContext(null);

const BookingProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [date, setDate] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [isSelectedColor, setIsSelectedColor] = useState(Array(20).fill(false));
  const [pickedColors, setPickedColors] = useState([]);

  const COLORS = [
    "black",
    "white",
    "gold",
    "silver",
    "red",
    "#FA8072",
    "orange",
    "#a66c08",
    "#edebda",
    "#ccbda3",
    "yellow",
    "#acf7a1",
    "#63a649",
    "green",
    "turquoise",
    "lightblue",
    "#0390fc",
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

  return (
    <BookingContext.Provider
      value={{
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
        handleClick,
        pickedColors,
        isSelectedColor,
        COLORS,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
