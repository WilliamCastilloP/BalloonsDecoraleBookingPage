const { db } = require("../../db/client");

// GET ALL IMAGES
const getImages = async (req, res) => {
  try {
    const images = await db.collection("images").find().toArray();

    res.status(200).json({
      status: 200,
      message: "success",
      data: images,
    });
  } catch (err) {
    console.error("getImages error:", err);
    res.status(500).json({ status: 500, error: "Server error" });
  }
};

// GET IMAGE
const getImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const foundImage = await db.collection("images").findOne({ _id });

    if (!foundImage) {
      return res.status(404).json({
        status: 404,
        message: `Image with id ${imageId} not found`,
      });
    }

    res.status(200).json({
      status: 200,
      message: "success",
      data: foundImage,
    });
  } catch (err) {
    console.error("getImage error:", err);
    res.status(500).json({ status: 500, error: "Server error" });
  }
};

module.exports = { getImages, getImage };
