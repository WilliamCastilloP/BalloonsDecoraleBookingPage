const express = require("express");
const morgan = require("morgan");
const PORT = 8000;
// importing our handlers
const { getImages, getImage } = require("./handlers/images/imagesHandlers");
const { addEvent, getEvents } = require("./handlers/events/eventsHandler");

// Calling express and adding .use config
express()
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // These are the images endpoints
  .get("/images", getImages)
  .get("/booking/:imageId", getImage)

  // These are the events endpoints
  .get("/events", getEvents)
  .post("/events", addEvent)

  .listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`);
  });
