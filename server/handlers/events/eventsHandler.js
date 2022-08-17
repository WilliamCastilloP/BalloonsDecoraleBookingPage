// requiring our db and client
const { db } = require("../../db/client");

// required UUID to create random IDs
const { v4: uuidv4 } = require("uuid");

// Creates a new event
const addEvent = async (req, res) => {
  // generate an ID
  const _id = uuidv4();
  // capture all values coming from the client
  const {
    user,
    firstName,
    lastName,
    postalCode,
    date,
    theme,
    description,
    pickedColors,
    isSelectedColor,
  } = req.body;

  // create variables to add new user to db
  const userSub = user.sub;
  const userName = user.name;

  // function that checks if an input includes numbers
  const isNumber = (string) => {
    for (let i = 0; i < string.length; i++) {
      if (!isNaN(string.charAt(i)) && !(string.charAt(i) === " ")) {
        return true;
      }
    }
    return false;
  };

  // check there's no missing information, and if it is, sending error response
  if (
    pickedColors.length < 1 ||
    !firstName ||
    !lastName ||
    !postalCode ||
    !date ||
    !theme ||
    !description ||
    !isSelectedColor
  ) {
    // send this response if any of the inputs info are missing
    setTimeout(() => {
      res.status(400).json({ status: 400, message: "error", data: req.body });
    }, 1000);
    // send this response if first or lastname contains numbers
  } else if (isNumber(firstName) || isNumber(lastName) || isNumber(theme)) {
    setTimeout(() => {
      res.status(406).json({ status: 406, message: "error", data: req.body });
    }, 1000);
    //  if no errors were found, lets create a new obj with the new generated Id
  } else {
    const newEventObj = {
      _id,
      user: userName,
      firstName,
      lastName,
      postalCode,
      date,
      theme,
      description,
      isSelectedColor,
      pickedColors,
      ...req.body,
    };
    // create a new Date Obj
    const newDateObj = { _id, date };
    // create a new User obj
    const newUserObj = { _id: userSub, user };

    // Add a new event to events collection
    const added = await db.collection("events").insertOne(newEventObj);
    // Add a new date to dates collection
    const addedDate = await db.collection("dates").insertOne(newDateObj);
    // To add a new user, first we need to check that the user is new, so first we find all users
    const foundUsers = await db.collection("users").find().toArray();

    // let's compare the user from client to the ones found in the users collection
    // we'll use this flag to check if isNewUser so we can add it to db
    let isNewUser = true;
    foundUsers.forEach((user) => {
      if (user._id === userSub) {
        isNewUser = false;
      }
    });

    if (isNewUser === true) {
      // adds the new user to db
      await db.collection("users").insertOne(newUserObj);
    }

    // if everthing its ok, we send a delayed response of success with all data that was given by user
    setTimeout(() => {
      res.status(200).json({
        status: 200,
        message: "success",
        newEventObj,
        added,
        addedDate,
        newDateObj,
      });
    }, 1000);
  }
};

// Retrieves all events
const getEvents = async (req, res) => {
  // let's find all events in db
  const foundEvents = await db.collection("events").find().toArray();

  // sending a response of success with all the events
  setTimeout(() => {
    res.status(200).json({ status: 200, message: "success", foundEvents });
  }, 1000);
};

// retrieves a single events by Id
const getEvent = async (req, res) => {
  // we capture the Id from the params
  const _id = req.params.eventId;

  // find the event with this id
  const found = await db.collection("events").findOne({ _id });

  // sending a response with the event found
  res.status(200).json({ status: 200, message: "success", found });
};

// Update a booked event
const updateEvent = async (req, res) => {
  // first we capture the values from the users
  const {
    _id,
    firstName,
    lastName,
    postalCode,
    date,
    theme,
    pickedColors,
    description,
    isSelectedColor,
  } = req.body;

  // wecheck there's no information missing
  if (
    pickedColors.length < 1 ||
    !firstName ||
    !lastName ||
    !postalCode ||
    !date ||
    !theme ||
    !description ||
    !isSelectedColor
  ) {
    // if something is missing, we send a response with an error
    res.status(400).json({ status: 400, message: "error", data: req.body });
  } else {
    // if everything's ok, we create our query and new values variables to update
    const query = { _id };
    const newValues = {
      $set: {
        firstName,
        lastName,
        postalCode,
        date,
        theme,
        description,
        isSelectedColor,
        pickedColors,
      },
    };

    // let's change also the date in the dates collection, so the previous date will be available in the calendar again
    const dateInDatabase = await db.collection("dates").findOne({ _id });
    if (date !== dateInDatabase) {
      deletedDateInDatabase = await db.collection("dates").deleteOne({ _id });
    }
    // update the event with the new values
    const updated = await db.collection("events").updateOne(query, newValues);
    // add the new date to dates collection
    await db.collection("dates").insertOne({ _id, date });

    // if everything's ok, send a success response
    updated.acknowledged;
    res.status(200).json({ status: 200, message: "success", updated });
  }
};

// deletes a booked event
const deleteEvent = async (req, res) => {
  // we capture our Id variable
  const { _id } = req.body;

  // lets delete this event with this Id
  const deletedEvent = await db.collection("events").deleteOne({ _id });
  // lets also delete this date so we can make it available again if is not in the past.
  const deletedDate = await db.collection("dates").deleteOne({ _id });

  // if everything's ok, we send a success response
  deletedEvent.acknowledged && deletedDate.acknowledged
    ? res.status(200).json({
        status: 200,
        message: "success",
        deletedEvent,
        deletedDate,
        _id,
      })
    : res.status(400).json({ status: 400, message: "error", _id });
};

// exporting all of our handlers to make them available in server.js
module.exports = { addEvent, getEvents, updateEvent, getEvent, deleteEvent };
