const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { getTasks } = require("./controllers/task.controller");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", async (req, res) => {
  await getTasks(req, res);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
