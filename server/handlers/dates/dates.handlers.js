const { db } = require("../../db/client");

// retrieves all dates from the dates collection
const getDates = async (req, res) => {
  foundDates = await db.collection("dates").find().toArray();

  res.status(200).json({ status: 200, message: "success", foundDates });
};

module.exports = { getDates };
