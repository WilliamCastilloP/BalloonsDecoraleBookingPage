const { db } = require("../../db/client");
// retrieves all dates from the dates collection
const getDates = async (req, res) => {
    try {
      const database = await db();
      const foundDates = await database.collection("dates").find().toArray();

      res.status(200).json({ status: 200, message: "success", foundDates });
    } catch (err) {
      console.error("getDates error:", err);
      res.status(500).json({ status: 500, error: "Server error" });
    }
  
};

module.exports = { getDates };
