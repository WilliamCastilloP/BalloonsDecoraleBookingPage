const { db } = require("../../db/client");
const { v4: uuidv4 } = require("uuid");

const addEvent = async (req, res) => {
  const _id = uuidv4();
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
  const userSub = user.sub;
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
    setTimeout(() => {
      res.status(400).json({ status: 400, message: "error", data: req.body });
    }, 1000);
  } else {
    const newEventObj = { _id, ...req.body };
    const newDateObj = { _id, date };
    const newUserObj = { _id: userSub, user };
    const added = await db.collection("events").insertOne(newEventObj);
    const addedDate = await db.collection("dates").insertOne(newDateObj);

    const foundUsers = await db.collection("users").find().toArray();
    let isNewUser = true;
    foundUsers.forEach((user) => {
      if (user._id === userSub) {
        isNewUser = false;
      }
    });

    if (isNewUser === true) {
      await db.collection("users").insertOne(newUserObj);
    }

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

const getEvents = async (req, res) => {
  const foundEvents = await db.collection("events").find().toArray();

  res.status(200).json({ status: 200, message: "success", foundEvents });
};

const getEvent = async (req, res) => {
  const _id = req.params.eventId;

  const found = await db.collection("events").findOne({ _id });

  res.status(200).json({ status: 200, message: "success", found });
};

const updateEvent = async (req, res) => {
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
    res.status(400).json({ status: 400, message: "error", data: req.body });
  } else {
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

    const dateInDatabase = await db.collection("dates").findOne({ _id });
    if (date !== dateInDatabase) {
      deletedDateInDatabase = await db.collection("dates").deleteOne({ _id });
    }
    const updated = await db.collection("events").updateOne(query, newValues);
    await db.collection("dates").insertOne({ _id, date });
    updated.acknowledged;
    res.status(200).json({ status: 200, message: "success", updated });
  }
};

const deleteEvent = async (req, res) => {
  const { _id } = req.body;

  const deleted = await db.collection("events").deleteOne({ _id });

  deleted.acknowledged
    ? res.status(200).json({ status: 200, message: "success", deleted, _id })
    : res.status(400).json({ status: 400, message: "error", _id });
};

module.exports = { addEvent, getEvents, updateEvent, getEvent, deleteEvent };
