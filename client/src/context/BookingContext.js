import { createContext, useEffect, useState } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { COLORS } from "../constans";

export const BookingContext = createContext(null);

// Let's create a booking context so the whole app can have access to it
const BookingProvider = ({ children }) => {
  // inputs states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [isSelectedColor, setIsSelectedColor] = useState(Array(20).fill(false));
  const [pickedColors, setPickedColors] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  // this state will help update the BookingPage component to have the latest changes
  const [isUpdated, setIsUpdated] = useState(false);
  // this is the error state for the BookingPage
  const [error, setError] = useState({ status: false, message: "" });
  // this is the state for the CircularProgress component in bookingPage
  const [isLoading, setIsLoading] = useState(false);

  // this func will add a new color to pickedColors array when the ColorButtom component is clicked.
  const handleClick = (e, index) => {
    e.preventDefault();
    // let's find the index of the current color to see if was already click
    const foundIndex = pickedColors.findIndex(
      (pickedColor) => pickedColor === e.currentTarget.value
    );

    // if we find the same color, we splice it, if not, we add it!
    if (foundIndex !== -1) {
      pickedColors.splice(foundIndex, 1);
      setPickedColors([...pickedColors]);
    } else {
      setPickedColors([...pickedColors, e.currentTarget.value]);
    }

    // we copy our isSelectedColor State to manipulate it
    const newState = [...isSelectedColor];
    // let's set the item with the index to the contrary so we can mark it as selected
    newState[index] = !newState[index];
    // the set the new array to the state
    setIsSelectedColor(newState);
  };

  // this will allow to mark unavailable dates in our calendar
  let reservedDatesArray = [];
  reservedDates.forEach((reservedDate) => {
    reservedDatesArray.push(parseISO(reservedDate.date));
  });

  // check if is the same day
  const isSameDay = (a, b) => {
    return differenceInCalendarDays(a, b) === 0;
  };
  // this func takes to parameters, date and view
  const tileDisabled = ({ date, view }) => {
    if (
      view === "month" &&
      // if we find the same day, it will return true and disable that calendar day
      reservedDatesArray.find((dDate) => isSameDay(dDate, date))
    ) {
      return true;
    }
  };

  // fetching all of our dates from server
  useEffect(() => {
    fetch("https://balloons-decorale.onrender.com/dates")
      .then((res) => res.json())
      .then((data) => {
        setReservedDates(data.foundDates);
      });
  }, [isUpdated]);

  // this func will reset forms back to empty values after post and put fetches
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

  // this finc will populate the updatePage form with the previous data
  const fillData = (previousData) => {
    setIsUpdated(!isUpdated);
    setFirstName(previousData.firstName);
    setLastname(previousData.lastName);
    setPostalCode(previousData.postalCode);
    setTheme(previousData.theme);
    setDescription(previousData.description);

    // let's set back our selected colors from previous data
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
