const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use("/", (req, res) => {
  return res.send("Successfully connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
