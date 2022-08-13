const { db } = require("../../db/client");

const getDates = async (req, res) => {
  foundDates = await db.collection("dates").find().toArray();

  res.status(200).json({ status: 200, message: "success", foundDates });
};

module.exports = { getDates };
