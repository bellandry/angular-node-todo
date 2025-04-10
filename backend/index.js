const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");
const { verifyToken } = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(
      `Status: ${res.statusCode}, Route: ${req.originalUrl}, Method: ${req.method}`
    );
  });
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));

// middleware to manage validation errors
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});
