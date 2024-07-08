const express = require("express");
const dbConnection = require("./config/dbConnection");
require("dotenv").config();

const app = express();
const port = 3000;

dbConnection();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
