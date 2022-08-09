"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = 8000;
// importing our handlers
const { getImages, getImage } = require("./handlers/images/imagesHandlers");
const {
  addEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("./handlers/events/eventsHandler");

// Calling express and adding .use config
express()
  .use(cors({ origin: "*" }))

  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // These are the images endpoints
  .get("/images", getImages)
  .get("/booking/:imageId", getImage)

  // These are the events endpoints
  .get("/events", getEvents)
  .get("/events/:eventId", getEvent)
  .post("/events", addEvent)
  .put("/events", updateEvent)
  .delete("/events", deleteEvent)

  .listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`);
  });
