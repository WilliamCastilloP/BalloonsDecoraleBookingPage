const images = require("./data/images.json");
const users = require("./data/users.json");
const { db, client } = require("./db/client");

// Seeding the database with all the images and users

const batchImport = async () => {
  try {
    await client.connect();
    console.log("connected");

    await db.collection("images").insertMany(images);
    await db.collection("users").insertMany(users);

    await client.close();
    console.log("disconnected");
  } catch (err) {
    console.log(err.message);
  }
};

batchImport();
