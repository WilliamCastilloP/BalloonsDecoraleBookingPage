const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

const db = client.db("decorations");

client.connect()
  .then(() => console.log("Mongo connected (startup)"))
  .catch(err => console.error("Mongo connect failed", err));

module.exports = { db };

