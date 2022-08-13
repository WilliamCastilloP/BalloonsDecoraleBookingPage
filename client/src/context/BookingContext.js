import { createContext, useEffect, useState } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { COLORS } from "../constans";

export const BookingContext = createContext(null);

const BookingProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [isSelectedColor, setIsSelectedColor] = useState(Array(20).fill(false));
  const [pickedColors, setPickedColors] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(newState);
    setIsSelectedColor(newState);
  };

  let reservedDatesArray = [];
  reservedDates.forEach((reservedDate) => {
    reservedDatesArray.push(parseISO(reservedDate.date));
  });

  const isSameDay = (a, b) => {
    return differenceInCalendarDays(a, b) === 0;
  };

  const tileDisabled = ({ date, view }) => {
    if (
      view === "month" &&
      reservedDatesArray.find((dDate) => isSameDay(dDate, date))
    ) {
      return true;
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/dates")
      .then((res) => res.json())
      .then((data) => {
        setReservedDates(data.foundDates);
      });
  }, [isUpdated]);

  const resetForm = () => {
    setFirstName("");
    setLastname("");
    setPostalCode("");
    setDate(new Date());
    setTheme("");
    setDescription("");
    setPickedColors([]);
    setIsSelectedColor(Array(20).fill(false));
    setError(false);
    setIsLoading(false);
  };

  const fillData = (previousData) => {
    setIsUpdated(!isUpdated);
    setFirstName(previousData.firstName);
    setLastname(previousData.lastName);
    setPostalCode(previousData.postalCode);
    setTheme(previousData.theme);
    setDescription(previousData.description);

    if (previousData.isSelectedColor) {
      let clickedColors = [];
      previousData.isSelectedColor.forEach((e, index) => {
        if (e) {
          clickedColors.push(COLORS[index]);
        }
      });
      setPickedColors(clickedColors);
      setIsSelectedColor(previousData.isSelectedColor);
    }
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
        setPickedColors,
        isSelectedColor,
        setIsSelectedColor,
        reservedDates,
        setReservedDates,
        tileDisabled,
        COLORS,
        isUpdated,
        setIsUpdated,
        resetForm,
        fillData,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
