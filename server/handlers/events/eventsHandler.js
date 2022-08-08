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
    : res.status(400).json({ status: 400, message: "error" });
};

const getEvents = async (req, res) => {
  const foundEvents = await db.collection("events").find().toArray();

  res.status(200).json({ status: 200, message: "success", foundEvents });
};

module.exports = { addEvent, getEvents };
