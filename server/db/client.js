require("dotenv").config();
const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db("decorations");
    console.log("✅ MongoDB connected");
  }
  return db;
};

module.exports = { connectDB };

