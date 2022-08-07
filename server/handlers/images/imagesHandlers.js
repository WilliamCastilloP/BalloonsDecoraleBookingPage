const { db } = require("../../db/client");

const getImages = async (req, res) => {
  const images = await db.collection("images").find().toArray();

  res.status(200).json({ status: 200, message: "success", data: images });
};

const getImage = async (req, res) => {};

module.exports = { getImages, getImage };
