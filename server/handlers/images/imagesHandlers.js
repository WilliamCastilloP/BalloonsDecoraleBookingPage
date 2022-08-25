const { db, client } = require("../../db/client");

// retrieves all images in the db
const getImages = async (req, res) => {
  await client.connect();
  const images = await db.collection("images").find().toArray();

  res.status(200).json({ status: 200, message: "success", data: images });
};

// retrieves a single image by image ID
const getImage = async (req, res) => {
  const { imageId } = req.params;
  const _id = imageId;
  const foundImage = await db.collection("images").findOne({ _id });

  foundImage
    ? setTimeout(() => {
        res
          .status(200)
          .json({ status: 200, message: "success", data: foundImage });
      }, 2000)
    : res
        .status(404)
        .json({ status: 404, message: `Image with id ${imageId} not found` });
};

module.exports = { getImages, getImage };
