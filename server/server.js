"use strict";
// REQUIRING
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
// This is the port constant
const PORT = process.env.PORT || 8000;
// importing our ednpoint handlers
const { getImages, getImage } = require("./handlers/images/imagesHandlers");
const {
  addEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("./handlers/events/eventsHandler");
const { getDates } = require("./handlers/dates/dates.handlers");
const { getUsers } = require("./handlers/users/usersHandlers");

// Calling express and adding .use config
express()
  .use(cors({ origin: "*" }))

  .use(morgan("tiny"))
  .use(express.static("build"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // ALL THE ENDPOINTS START HERE//////////////

  // IMAGES ENDPOINTS ///////
  // serves all the images in the db
  .get("/images", getImages)
  // serves a image using the id
  .get("/booking/:imageId", getImage)

  // EVENTS ENDPOINTS ///////
  // serves all the events
  .get("/events", getEvents)
  // serves an event by id
  .get("/events/:eventId", getEvent)
  // creates a new event
  .post("/events", addEvent)
  // this endpoint will update a booked event
  .put("/events", updateEvent)
  // deletes a booked event
  .delete("/events", deleteEvent)

  // DATES ENDPOINTS ///////
  // serves all the dates booked
  .get("/dates", getDates)

  // USERS ENDPOINTS ////////
  // serves all users
  .get("/users", getUsers)
  // ENDPOINTS ENDS HERE

  .get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  })

  .listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`);
  });
