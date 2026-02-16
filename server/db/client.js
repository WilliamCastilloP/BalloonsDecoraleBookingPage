require("dotenv").config();
const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

let connectDB;

const db = async () => {
  if (!connectDB ) {
    await client.connect();
    connectDB = client.db("decorations");
    console.log("✅ MongoDB connected");
  }
  return connectDB;
};

module.exports = { db };

