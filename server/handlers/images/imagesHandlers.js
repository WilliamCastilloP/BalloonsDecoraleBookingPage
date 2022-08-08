const { db } = require("../../db/client");

const getImages = async (req, res) => {
  const images = await db.collection("images").find().toArray();

  res.status(200).json({ status: 200, message: "success", data: images });
};

const getImage = async (req, res) => {
  const { imageId } = req.params;
  const _id = imageId;
  const foundImage = await db.collection("images").findOne({ _id });

  foundImage
    ? res
        .status(200)
        .json({ status: 200, message: "success", data: foundImage })
    : res
        .status(404)
        .json({ status: 404, message: `Image with id ${imageId} not found` });
};

module.exports = { getImages, getImage };
