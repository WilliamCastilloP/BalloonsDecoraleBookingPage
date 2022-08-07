require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

// Seperate db for other files to easily export it
// through out the app.

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("decorations");

module.exports = { db, client };
