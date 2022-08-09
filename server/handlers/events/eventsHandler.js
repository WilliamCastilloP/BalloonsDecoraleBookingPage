const { db } = require("../../db/client");
const { v4: uuidv4 } = require("uuid");

const addEvent = async (req, res) => {
  const _id = uuidv4();

  const newEventObj = { _id, ...req.body };
  const added = await db.collection("events").insertOne(newEventObj);
  added.acknowledged === true
    ? res
        .status(200)
        .json({ status: 200, message: "success", newEventObj, added })
    : res.status(400).json({ status: 400, message: "error", data: req.body });
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
    colors,
    description,
  } = req.body;

  const query = { _id };
  const newValues = {
    $set: { firstName, lastName, postalCode, date, theme, colors, description },
  };
  const updated = await db.collection("events").updateOne(query, newValues);
  updated.acknowledged
    ? res.status(200).json({ status: 200, message: "success", updated })
    : res.status(400).json({ status: 400, message: "error", data: req.body });
};

const deleteEvent = async (req, res) => {
  const { _id } = req.body;

  const deleted = await db.collection("events").deleteOne({ _id });

  deleted.acknowledged
    ? res.status(200).json({ status: 200, message: "success", deleted, _id })
    : res.status(400).json({ status: 400, message: "error", _id });
};

module.exports = { addEvent, getEvents, updateEvent, getEvent, deleteEvent };
