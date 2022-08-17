require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

// Seperate db for other files to easily export it
// through out the app.

// Mongo client options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// setting up MongoClient
const client = new MongoClient(MONGO_URI, options);
// selecing the db to be used.
const db = client.db("decorations");

module.exports = { db, client };
