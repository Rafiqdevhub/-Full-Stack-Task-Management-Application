const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dbConnection = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 3000;

dbConnection();

app.use(express.json());

const origin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
