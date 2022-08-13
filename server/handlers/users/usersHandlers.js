const { db } = require("../../db/client");

const getUsers = async (req, res) => {
  const foundUsers = await db.collection("users").find().toArray();

  res.status(200).json({ status: 200, message: "success", foundUsers });
};

module.exports = { getUsers };
