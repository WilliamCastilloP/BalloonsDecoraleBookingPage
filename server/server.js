const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "its alive!!" });
});

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
