const { connectDB } = require("../../db/client");

// retrieves all users in the users collection
const getUsers = async (req, res) => {
  const db = await connectDB();
  const foundUsers = await db.collection("users").find().toArray();

  res.status(200).json({ status: 200, message: "success", foundUsers });
};

module.exports = { getUsers };
